import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const session = await requireAdmin(req, res);

  if (!session) {
    return;
  }

  const { id } = req.query;

  if (typeof id !== "string" || !id.trim()) {
    return res.status(400).json({
      message: "Некоректний ID замовлення",
    });
  }

  try {
    const order = await prisma.$transaction(async (tx) => {
      // Атомарно змінюємо статус лише тоді,
      // коли замовлення ще не скасоване
      // і не відправлене/завершене.
      const updated = await tx.order.updateMany({
        where: {
          id,
          status: {
            notIn: ["CANCELLED", "SHIPPED", "COMPLETED"],
          },
        },
        data: {
          status: "CANCELLED",
        },
      });

      if (updated.count === 0) {
        const existing = await tx.order.findUnique({
          where: { id },
          select: { status: true },
        });

        if (!existing) throw new Error("ORDER_NOT_FOUND");
        if (existing.status === "CANCELLED") {
          throw new Error("ORDER_ALREADY_CANCELLED");
        }

        throw new Error("ORDER_CANNOT_BE_CANCELLED");
      }

      const items = await tx.orderItem.findMany({
        where: { orderId: id },
      });

      for (const item of items) {
        const product = await tx.product.update({
          where: { id: item.productId },
          data: {
            stockQuantity: { increment: item.quantity },
            inStock: true,
          },
          select: { id: true },
        });

        if (!product) throw new Error("PRODUCT_NOT_FOUND");
      }

      return tx.order.findUnique({
        where: { id },
        include: { items: true },
      });
    });

    return res.status(200).json({
      success: true,
      message: "Замовлення скасовано, товари повернуто на склад",
      order,
    });
  } catch (error) {
    console.error("Cancel order error:", error);

    const errors = {
      ORDER_NOT_FOUND: [404, "Замовлення не знайдено"],
      ORDER_ALREADY_CANCELLED: [409, "Це замовлення вже скасоване"],
      ORDER_CANNOT_BE_CANCELLED: [
        409,
        "Відправлене або завершене замовлення не можна скасувати",
      ],
    };

    const knownError = errors[error.message];

    if (knownError) {
      return res.status(knownError[0]).json({
        message: knownError[1],
      });
    }

    return res.status(500).json({
      message: "Помилка під час скасування замовлення",
    });
  }
}

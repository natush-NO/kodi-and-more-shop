import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

const allowedStatuses = ["NEW", "CONFIRMED", "SHIPPED", "COMPLETED"];

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    res.setHeader("Allow", ["PATCH"]);

    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const session = await requireAdmin(req, res);

  if (!session) {
    return;
  }

  const { id } = req.query;
  const { status } = req.body ?? {};

  if (typeof id !== "string" || !id.trim()) {
    return res.status(400).json({
      message: "Некоректний ID замовлення",
    });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Некоректний статус замовлення",
    });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      select: { id: true, status: true },
    });

    if (!order) {
      return res.status(404).json({
        message: "Замовлення не знайдено",
      });
    }

    if (order.status === "CANCELLED") {
      return res.status(409).json({
        message: "Скасоване замовлення не можна змінити",
      });
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true },
    });

    return res.status(200).json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Update order status error:", error);

    return res.status(500).json({
      message: "Не вдалося змінити статус замовлення",
    });
  }
}

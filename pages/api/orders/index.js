import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { getProductTranslation } from "@/lib/translations";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);

    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const session = await requireAdmin(req, res);

  if (!session) {
    return;
  }

  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const translatedOrders = orders.map((order) => ({
      ...order,
      items: order.items.map((item) => ({
        ...item,
        productName: getProductTranslation(item.productName, order.locale),
      })),
    }));

    return res.status(200).json(translatedOrders);
  } catch (error) {
    console.error("Get orders error:", error);

    return res.status(500).json({
      message: "Не вдалося завантажити замовлення",
    });
  }
}

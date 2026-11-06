import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export default async function handler(req, res) {
  // Дозволені HTTP-методи
  if (!["GET", "PATCH"].includes(req.method)) {
    res.setHeader("Allow", ["GET", "PATCH"]);

    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const { id } = req.query;

  try {
    // PATCH: оновлення товару
    if (req.method === "PATCH") {
      const session = await requireAdmin(req, res);

      if (!session) {
        return;
      }

      const { price, salePrice, stockQuantity } = req.body ?? {};

      const data = {};

      // Перевірка та оновлення звичайної ціни
      if (price !== undefined) {
        if (!Number.isInteger(price) || price < 0) {
          return res.status(400).json({
            message: "Price must be a non-negative integer",
          });
        }

        data.price = price;
      }

      // Перевірка та оновлення акційної ціни
      if (salePrice !== undefined) {
        if (
          salePrice !== null &&
          (!Number.isInteger(salePrice) || salePrice < 0)
        ) {
          return res.status(400).json({
            message: "Sale price must be null or a non-negative integer",
          });
        }

        data.salePrice = salePrice;
      }

      // Перевірка та оновлення кількості товару
      if (stockQuantity !== undefined) {
        if (!Number.isInteger(stockQuantity) || stockQuantity < 0) {
          return res.status(400).json({
            message: "Stock quantity must be a non-negative integer",
          });
        }

        data.stockQuantity = stockQuantity;

        // Автоматична синхронізація наявності
        data.inStock = stockQuantity > 0;
      }

      // Перевірка наявності полів для оновлення
      if (Object.keys(data).length === 0) {
        return res.status(400).json({
          message: "No valid fields provided for update",
        });
      }

      // Автоматичне визначення акційного товару
      if (price !== undefined || salePrice !== undefined) {
        const currentProduct = await prisma.product.findUnique({
          where: { id },
        });

        if (!currentProduct) {
          return res.status(404).json({
            message: "Product not found",
          });
        }

        const finalPrice = data.price ?? currentProduct.price;

        const finalSalePrice =
          salePrice !== undefined ? salePrice : currentProduct.salePrice;

        // Акційна ціна має бути нижчою за звичайну
        if (finalSalePrice !== null && finalSalePrice >= finalPrice) {
          return res.status(400).json({
            message: "Sale price must be lower than regular price",
          });
        }

        data.isSale = finalSalePrice !== null && finalSalePrice < finalPrice;
      }

      // Оновлення товару в базі даних
      const updatedProduct = await prisma.product.update({
        where: { id },
        data,
      });

      return res.status(200).json(updatedProduct);
    }

    // GET: отримання товару за ID
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    // Товар не знайдено
    if (error?.code === "P2025") {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    console.error("Failed to process product request:", error);

    return res.status(500).json({
      message: "Failed to process product request",
    });
  }
}

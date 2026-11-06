import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany();

      return res.status(200).json(products);
    } catch (error) {
      console.error("Failed to fetch products:", error);

      return res.status(500).json({
        message: "Failed to fetch products",
      });
    }
  }

  res.setHeader("Allow", ["GET"]);

  return res.status(405).json({
    message: "Method not allowed",
  });
}

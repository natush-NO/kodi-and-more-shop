import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import crystalDropsKodi from "../lib/kodi/nailsKodiPage/baseKodiList/colorBaseCollectionsKodi/crystalDropsBaseKodi/index.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const products = crystalDropsKodi.map((product) => ({
  id: product.id,
  brand: product.brand,
  category: product.category,
  collection: product.collection,
  titleKey: product.titleKey,
  barcode: product.barcode,

  colorId: product.color.id,
  colorTitleKey: product.color.titleKey,
  colorCode: product.color.code,

  volumeValue: product.volume.value,
  volumeUnit: product.volume.unit,

  price: product.price,
  salePrice: product.salePrice,

  isNew: product.isNew,
  isSale: product.isSale,
  inStock: product.inStock,

  image: product.image,
  href: product.href,
}));

async function main() {
  await prisma.product.createMany({
    data: products,
  });

  console.log("Products successfully added!");
}

main()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

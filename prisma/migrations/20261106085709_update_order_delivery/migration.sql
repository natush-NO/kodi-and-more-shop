-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "cityRef" TEXT,
ADD COLUMN     "deliveryAddress" TEXT,
ADD COLUMN     "deliveryType" TEXT NOT NULL DEFAULT 'novaPoshta',
ADD COLUMN     "warehouseName" TEXT,
ADD COLUMN     "warehouseRef" TEXT,
ALTER COLUMN "novaPoshta" DROP NOT NULL;

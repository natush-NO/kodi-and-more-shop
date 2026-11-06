-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "collection" TEXT NOT NULL,
    "titleKey" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "colorId" TEXT NOT NULL,
    "colorTitleKey" TEXT NOT NULL,
    "colorCode" TEXT NOT NULL,
    "volumeValue" INTEGER NOT NULL,
    "volumeUnit" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "salePrice" INTEGER,
    "isNew" BOOLEAN NOT NULL,
    "isSale" BOOLEAN NOT NULL,
    "inStock" BOOLEAN NOT NULL,
    "image" TEXT NOT NULL,
    "href" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_barcode_key" ON "Product"("barcode");

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "novaPoshta" TEXT NOT NULL,
    "comment" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'uk',
    "total" INTEGER NOT NULL,
    "cartCount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "lineTotal" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

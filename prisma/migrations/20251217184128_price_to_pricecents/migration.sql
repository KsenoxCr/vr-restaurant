/*
  Warnings:

  - You are about to drop the column `price` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `priceSnapshot` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `priceCents` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCents` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceSnapshotCents` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "price",
ADD COLUMN     "priceCents" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "total",
ADD COLUMN     "totalCents" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "priceSnapshot",
ADD COLUMN     "priceSnapshotCents" INTEGER NOT NULL;

/*
  Warnings:

  - Changed the type of `seatNumber` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `seatNumber` on the `Session` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SessionRole" AS ENUM ('CUSTOMER', 'KITCHEN');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "seatNumber",
ADD COLUMN     "seatNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "role" "SessionRole" NOT NULL DEFAULT 'CUSTOMER',
DROP COLUMN "seatNumber",
ADD COLUMN     "seatNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Order_seatNumber_idx" ON "Order"("seatNumber");

-- CreateIndex
CREATE INDEX "Session_seatNumber_idx" ON "Session"("seatNumber");

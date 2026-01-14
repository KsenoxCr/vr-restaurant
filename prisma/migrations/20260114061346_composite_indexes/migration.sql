-- DropIndex
DROP INDEX "MenuItem_available_idx";

-- DropIndex
DROP INDEX "Order_createdAt_idx";

-- DropIndex
DROP INDEX "Order_seatNumber_idx";

-- DropIndex
DROP INDEX "Order_status_idx";

-- CreateIndex
CREATE INDEX "Order_status_queuePosition_idx" ON "Order"("status", "queuePosition");

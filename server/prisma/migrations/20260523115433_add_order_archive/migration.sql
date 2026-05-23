-- CreateTable
CREATE TABLE "OrderArchive" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "theTotalAmount" DECIMAL(10,2) NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "archivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "items" JSONB NOT NULL,

    CONSTRAINT "OrderArchive_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrderArchive_storeId_idx" ON "OrderArchive"("storeId");

-- CreateIndex
CREATE INDEX "OrderArchive_createdAt_idx" ON "OrderArchive"("createdAt");

-- CreateIndex
CREATE INDEX "OrderArchive_storeId_createdAt_idx" ON "OrderArchive"("storeId", "createdAt");

-- CreateIndex
CREATE INDEX "OrderArchive_archivedAt_idx" ON "OrderArchive"("archivedAt");

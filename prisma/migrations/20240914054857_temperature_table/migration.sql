-- CreateTable
CREATE TABLE "temperature" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "temperature" DOUBLE PRECISION,
    "sensor_id" TEXT NOT NULL,

    CONSTRAINT "temperature_pkey" PRIMARY KEY ("id","timestamp")
);

-- CreateIndex
CREATE INDEX "temperature_timestamp_idx" ON "temperature"("timestamp");

/*
  Warnings:

  - You are about to drop the column `typeId` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `vehicleTypeId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_typeId_fkey";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "typeId",
ADD COLUMN     "vehicleTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

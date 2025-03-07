/*
  Warnings:

  - Added the required column `wheels` to the `VehicleType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VehicleType" ADD COLUMN     "wheels" INTEGER NOT NULL;

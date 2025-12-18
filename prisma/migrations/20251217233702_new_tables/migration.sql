/*
  Warnings:

  - Added the required column `foodType` to the `Scenario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FoodType" AS ENUM ('MEAL', 'SNACK', 'DRINK');

-- CreateEnum
CREATE TYPE "RoastScope" AS ENUM ('DISH', 'QUESTION', 'OPTION');

-- AlterTable
ALTER TABLE "Scenario" ADD COLUMN     "foodType" "FoodType" NOT NULL;

-- CreateTable
CREATE TABLE "RoastLine" (
    "id" TEXT NOT NULL,
    "scope" "RoastScope" NOT NULL,
    "foodType" "FoodType",
    "dishKey" TEXT,
    "questionKey" TEXT,
    "optionLabel" TEXT,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoastLine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RoastLine_scope_idx" ON "RoastLine"("scope");

-- CreateIndex
CREATE INDEX "RoastLine_foodType_idx" ON "RoastLine"("foodType");

-- CreateIndex
CREATE INDEX "RoastLine_questionKey_idx" ON "RoastLine"("questionKey");

-- CreateIndex
CREATE INDEX "RoastLine_dishKey_idx" ON "RoastLine"("dishKey");

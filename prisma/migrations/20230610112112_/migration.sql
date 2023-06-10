/*
  Warnings:

  - You are about to drop the column `teamId` on the `Squad` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Squad" DROP CONSTRAINT "Squad_teamId_fkey";

-- DropIndex
DROP INDEX "Squad_teamId_key";

-- AlterTable
ALTER TABLE "Squad" DROP COLUMN "teamId";

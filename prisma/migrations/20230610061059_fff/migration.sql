/*
  Warnings:

  - You are about to drop the column `areaId` on the `Competition` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Competition" DROP CONSTRAINT "Competition_areaId_fkey";

-- AlterTable
ALTER TABLE "Competition" DROP COLUMN "areaId";

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_id_fkey" FOREIGN KEY ("id") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

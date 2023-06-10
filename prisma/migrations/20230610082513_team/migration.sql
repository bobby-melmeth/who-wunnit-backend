/*
  Warnings:

  - You are about to drop the column `areaId` on the `Competition` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdated` on the `Competition` table. All the data in the column will be lost.
  - The primary key for the `League` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `League` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[teamId]` on the table `Squad` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `areaId` to the `League` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `League` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emblemUrl` to the `League` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastUpdated` to the `League` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `League` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan` to the `League` table without a default value. This is not possible if the table is not empty.
  - Made the column `teamId` on table `Squad` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Competition" DROP CONSTRAINT "Competition_areaId_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_id_fkey";

-- DropForeignKey
ALTER TABLE "Squad" DROP CONSTRAINT "Squad_teamId_fkey";

-- AlterTable
ALTER TABLE "Competition" DROP COLUMN "areaId",
DROP COLUMN "lastUpdated";

-- AlterTable
ALTER TABLE "League" DROP CONSTRAINT "League_pkey",
ADD COLUMN     "areaId" INTEGER NOT NULL,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "emblemUrl" TEXT NOT NULL,
ADD COLUMN     "lastUpdated" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "plan" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "League_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Squad" ALTER COLUMN "teamId" SET NOT NULL;

-- CreateTable
CREATE TABLE "RunningCompetitions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "emblemUrl" TEXT NOT NULL,
    "plan" TEXT NOT NULL,

    CONSTRAINT "RunningCompetitions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Squad_teamId_key" ON "Squad"("teamId");

-- AddForeignKey
ALTER TABLE "League" ADD CONSTRAINT "League_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_id_fkey" FOREIGN KEY ("id") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Squad" ADD CONSTRAINT "Squad_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

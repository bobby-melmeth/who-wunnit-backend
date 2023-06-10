/*
  Warnings:

  - You are about to drop the column `emblem` on the `RunningCompetitions` table. All the data in the column will be lost.
  - Added the required column `emblemUrl` to the `RunningCompetitions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RunningCompetitions" DROP COLUMN "emblem",
ADD COLUMN     "emblemUrl" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `emblemUrl` on the `RunningCompetitions` table. All the data in the column will be lost.
  - You are about to drop the column `plan` on the `RunningCompetitions` table. All the data in the column will be lost.
  - Added the required column `emblem` to the `RunningCompetitions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_id_fkey";

-- AlterTable
ALTER TABLE "RunningCompetitions" DROP COLUMN "emblemUrl",
DROP COLUMN "plan",
ADD COLUMN     "emblem" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

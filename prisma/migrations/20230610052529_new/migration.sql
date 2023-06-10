/*
  Warnings:

  - The primary key for the `Area` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Area` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Competition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `areaId` on the `Competition` table. All the data in the column will be lost.
  - The `id` column on the `Competition` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `CurrentSeason` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CurrentSeason` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `CurrentWinner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CurrentWinner` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Season` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Season` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Winner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Winner` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Competition" DROP CONSTRAINT "Competition_id_fkey";

-- DropForeignKey
ALTER TABLE "CurrentWinner" DROP CONSTRAINT "CurrentWinner_id_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_id_fkey";

-- DropForeignKey
ALTER TABLE "Winner" DROP CONSTRAINT "Winner_id_fkey";

-- AlterTable
ALTER TABLE "Area" DROP CONSTRAINT "Area_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Area_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Competition" DROP CONSTRAINT "Competition_pkey",
DROP COLUMN "areaId",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Competition_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CurrentSeason" DROP CONSTRAINT "CurrentSeason_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "CurrentSeason_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CurrentWinner" DROP CONSTRAINT "CurrentWinner_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "CurrentWinner_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Season" DROP CONSTRAINT "Season_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Season_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Winner" DROP CONSTRAINT "Winner_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Winner_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_id_fkey" FOREIGN KEY ("id") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_id_fkey" FOREIGN KEY ("id") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Winner" ADD CONSTRAINT "Winner_id_fkey" FOREIGN KEY ("id") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentWinner" ADD CONSTRAINT "CurrentWinner_id_fkey" FOREIGN KEY ("id") REFERENCES "CurrentSeason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

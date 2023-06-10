-- DropForeignKey
ALTER TABLE "Competition" DROP CONSTRAINT "Competition_id_fkey";

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

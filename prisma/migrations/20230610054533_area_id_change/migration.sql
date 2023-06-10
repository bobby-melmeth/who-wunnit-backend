-- DropForeignKey
ALTER TABLE "Competition" DROP CONSTRAINT "Competition_areaId_fkey";

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_id_fkey" FOREIGN KEY ("id") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

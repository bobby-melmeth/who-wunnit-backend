-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- CreateTable
CREATE TABLE "Competition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "emblemUrl" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "lastUpdated" TEXT NOT NULL,
    "areaId" INTEGER NOT NULL,

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "flag" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "winnerId" INTEGER,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Winner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "tla" TEXT NOT NULL,
    "crest" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "founded" INTEGER NOT NULL,
    "clubColors" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "lastUpdated" TEXT NOT NULL,
    "seasonId" INTEGER,

    CONSTRAINT "Winner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrentSeason" (
    "id" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,

    CONSTRAINT "CurrentSeason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrentWinner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "tla" TEXT NOT NULL,
    "crest" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "founded" INTEGER NOT NULL,
    "clubColors" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "lastUpdated" TEXT NOT NULL,

    CONSTRAINT "CurrentWinner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_id_fkey" FOREIGN KEY ("id") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_id_fkey" FOREIGN KEY ("id") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Winner" ADD CONSTRAINT "Winner_id_fkey" FOREIGN KEY ("id") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentWinner" ADD CONSTRAINT "CurrentWinner_id_fkey" FOREIGN KEY ("id") REFERENCES "CurrentSeason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

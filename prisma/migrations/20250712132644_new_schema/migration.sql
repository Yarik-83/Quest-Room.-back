/*
  Warnings:

  - You are about to drop the `QuestGenres` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestGenres" DROP CONSTRAINT "QuestGenres_ganreId_fkey";

-- DropForeignKey
ALTER TABLE "QuestGenres" DROP CONSTRAINT "QuestGenres_questId_fkey";

-- DropTable
DROP TABLE "QuestGenres";

-- CreateTable
CREATE TABLE "QuestGenre" (
    "questId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "QuestGenre_pkey" PRIMARY KEY ("questId","genreId")
);

-- AddForeignKey
ALTER TABLE "QuestGenre" ADD CONSTRAINT "QuestGenre_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestGenre" ADD CONSTRAINT "QuestGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

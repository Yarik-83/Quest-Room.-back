/*
  Warnings:

  - You are about to drop the `Ganre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GanreToQuest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GanreToQuest" DROP CONSTRAINT "_GanreToQuest_A_fkey";

-- DropForeignKey
ALTER TABLE "_GanreToQuest" DROP CONSTRAINT "_GanreToQuest_B_fkey";

-- DropTable
DROP TABLE "Ganre";

-- DropTable
DROP TABLE "_GanreToQuest";

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestGenres" (
    "questId" INTEGER NOT NULL,
    "ganreId" INTEGER NOT NULL,

    CONSTRAINT "QuestGenres_pkey" PRIMARY KEY ("questId","ganreId")
);

-- AddForeignKey
ALTER TABLE "QuestGenres" ADD CONSTRAINT "QuestGenres_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestGenres" ADD CONSTRAINT "QuestGenres_ganreId_fkey" FOREIGN KEY ("ganreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

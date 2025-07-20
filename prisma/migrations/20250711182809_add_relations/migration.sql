/*
  Warnings:

  - You are about to drop the column `questId` on the `Ganre` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ganre" DROP CONSTRAINT "Ganre_questId_fkey";

-- AlterTable
ALTER TABLE "Ganre" DROP COLUMN "questId";

-- CreateTable
CREATE TABLE "_QuestGenres" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_QuestGenres_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_QuestGenres_B_index" ON "_QuestGenres"("B");

-- AddForeignKey
ALTER TABLE "_QuestGenres" ADD CONSTRAINT "_QuestGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "Ganre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestGenres" ADD CONSTRAINT "_QuestGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

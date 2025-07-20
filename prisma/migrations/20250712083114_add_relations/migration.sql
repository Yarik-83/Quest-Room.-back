/*
  Warnings:

  - You are about to drop the `_QuestGenres` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_QuestGenres" DROP CONSTRAINT "_QuestGenres_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestGenres" DROP CONSTRAINT "_QuestGenres_B_fkey";

-- DropTable
DROP TABLE "_QuestGenres";

-- CreateTable
CREATE TABLE "_GanreToQuest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GanreToQuest_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GanreToQuest_B_index" ON "_GanreToQuest"("B");

-- AddForeignKey
ALTER TABLE "_GanreToQuest" ADD CONSTRAINT "_GanreToQuest_A_fkey" FOREIGN KEY ("A") REFERENCES "Ganre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GanreToQuest" ADD CONSTRAINT "_GanreToQuest_B_fkey" FOREIGN KEY ("B") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

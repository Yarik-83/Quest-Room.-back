/*
  Warnings:

  - The primary key for the `QuestGenre` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "QuestGenre" DROP CONSTRAINT "QuestGenre_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "QuestGenre_pkey" PRIMARY KEY ("id");

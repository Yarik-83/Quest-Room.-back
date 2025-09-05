/*
  Warnings:

  - Made the column `maxPlayers` on table `Quest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `minPlayers` on table `Quest` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Quest" ALTER COLUMN "maxPlayers" SET NOT NULL,
ALTER COLUMN "minPlayers" SET NOT NULL;

-- CreateTable
CREATE TABLE "Ganre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "questId" INTEGER NOT NULL,

    CONSTRAINT "Ganre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quest" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "people" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "picture" TEXT NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ganre" ADD CONSTRAINT "Ganre_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

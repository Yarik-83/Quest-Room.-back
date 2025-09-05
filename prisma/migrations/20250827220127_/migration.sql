/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `UserSignUpByPhone` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserSignUpByPhone_phone_key" ON "UserSignUpByPhone"("phone");

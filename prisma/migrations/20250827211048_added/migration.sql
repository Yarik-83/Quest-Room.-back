-- CreateTable
CREATE TABLE "UserSignUpByPhone" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "smsCode" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSignUpByPhone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "messageText" TEXT NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `gifts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `guests` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "gifts_title_key" ON "gifts"("title");

-- CreateIndex
CREATE UNIQUE INDEX "guests_email_key" ON "guests"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

/*
  Warnings:

  - You are about to drop the column `link_inactive` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `link_pay` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `link_self` on the `orders` table. All the data in the column will be lost.
  - Added the required column `price` to the `order_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_products" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "link_inactive",
DROP COLUMN "link_pay",
DROP COLUMN "link_self";

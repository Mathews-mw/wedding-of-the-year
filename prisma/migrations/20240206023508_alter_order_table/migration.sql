/*
  Warnings:

  - Changed the type of `item_quantity` on the `order_products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "order_products" DROP COLUMN "item_quantity",
ADD COLUMN     "item_quantity" INTEGER NOT NULL;

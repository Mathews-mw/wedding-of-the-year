-- CreateEnum
CREATE TYPE "OrderPaymentType" AS ENUM ('A_DEFINIR', 'PIX', 'CARTAO_CREDITO', 'DEBITO', 'BOLETO');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "OrderStatus" ADD VALUE 'AWAITING';
ALTER TYPE "OrderStatus" ADD VALUE 'CONFIRMED';

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "payment_type" "OrderPaymentType" NOT NULL DEFAULT 'A_DEFINIR';

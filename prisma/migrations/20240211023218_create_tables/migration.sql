-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gifts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "amount" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "gifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guests" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "family_members_amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "customer_name" TEXT,
    "customer_email" TEXT,
    "customer_cpf" TEXT,
    "checkout_id" TEXT NOT NULL,
    "reference_id" TEXT NOT NULL,
    "status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_products" (
    "id" TEXT NOT NULL,
    "item_reference_id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_quantity" INTEGER NOT NULL,
    "gift_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "order_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "messageText" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlist_owner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "wishlist_owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlist_gifts" (
    "id" TEXT NOT NULL,
    "wishlist_owner_id" TEXT NOT NULL,
    "gift_id" TEXT NOT NULL,

    CONSTRAINT "wishlist_gifts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "gifts_title_key" ON "gifts"("title");

-- CreateIndex
CREATE UNIQUE INDEX "guests_email_key" ON "guests"("email");

-- CreateIndex
CREATE UNIQUE INDEX "orders_reference_id_key" ON "orders"("reference_id");

-- CreateIndex
CREATE UNIQUE INDEX "wishlist_owner_email_key" ON "wishlist_owner"("email");

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_gift_id_fkey" FOREIGN KEY ("gift_id") REFERENCES "gifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist_gifts" ADD CONSTRAINT "wishlist_gifts_gift_id_fkey" FOREIGN KEY ("gift_id") REFERENCES "gifts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist_gifts" ADD CONSTRAINT "wishlist_gifts_wishlist_owner_id_fkey" FOREIGN KEY ("wishlist_owner_id") REFERENCES "wishlist_owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

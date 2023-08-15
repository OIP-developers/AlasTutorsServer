-- CreateTable
CREATE TABLE "AddCart" (
    "userId" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,

    CONSTRAINT "AddCart_pkey" PRIMARY KEY ("userId","cartId")
);

-- AddForeignKey
ALTER TABLE "AddCart" ADD CONSTRAINT "AddCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddCart" ADD CONSTRAINT "AddCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

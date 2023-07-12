-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "RoleCode" AS ENUM ('ADMIN', 'STORE_ADMIN', 'STORE_PRODUCT_MANAGER', 'STORE_ORDER_MANAGER', 'USER');

-- CreateEnum
CREATE TYPE "PhoneStatus" AS ENUM ('VERIFIED', 'PENDING', 'BLOCK', 'WRONG');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('SIGNIN', 'SIGNUP', 'EMAIL_VERIFY', 'PHONE_VERIFY', 'TWO_FACTOR_AUTHENTICATION', 'FORGOT_PASSWORD');

-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('CUSTOM', 'PRE_DEFINED', 'REQUESTED');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('initiated', 'paid', 'reject', 'cancel');

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "code" "RoleCode" NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keystore" (
    "id" TEXT NOT NULL,
    "primaryKey" TEXT NOT NULL,
    "secondaryKey" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "clientId" TEXT,

    CONSTRAINT "Keystore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tokenstore" (
    "id" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "token" TEXT NOT NULL,
    "shot_code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "expireAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Tokenstore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN DEFAULT true,
    "isPublish" BOOLEAN DEFAULT true,
    "isVerified" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "username" TEXT,
    "password" TEXT NOT NULL,
    "phone_status" "PhoneStatus" NOT NULL,
    "stripe_customerId" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "phone" TEXT,
    "profile_picture" TEXT,
    "gender" "Gender",
    "profile" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "status" BOOLEAN DEFAULT true,
    "isAccepted" BOOLEAN DEFAULT false,
    "isVerified" BOOLEAN DEFAULT true,
    "isActive" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "roleId" TEXT NOT NULL DEFAULT '167fab49-72bc-4e03-80e6-439a9c00c12c',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "public_source_url" TEXT NOT NULL,
    "private_source_url" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "dimensions" TEXT,
    "length" TEXT,
    "isPublish" BOOLEAN DEFAULT true,
    "isVerified" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "coins" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "stripe" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL,
    "userId" TEXT NOT NULL,
    "rideId" TEXT NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'initiated',
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_code_key" ON "Role"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Tokenstore_token_key" ON "Tokenstore"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Tokenstore_shot_code_key" ON "Tokenstore"("shot_code");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_key" ON "Wallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_stripe_key" ON "Invoice"("stripe");

-- AddForeignKey
ALTER TABLE "Keystore" ADD CONSTRAINT "Keystore_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tokenstore" ADD CONSTRAINT "Tokenstore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

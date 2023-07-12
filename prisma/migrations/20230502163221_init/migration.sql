-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false,
ADD COLUMN     "status" BOOLEAN DEFAULT true,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false,
ADD COLUMN     "status" BOOLEAN DEFAULT true,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OrderDetail" ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false,
ADD COLUMN     "status" BOOLEAN DEFAULT true,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false,
ADD COLUMN     "status" BOOLEAN DEFAULT true,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductCategory" ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false,
ADD COLUMN     "status" BOOLEAN DEFAULT true,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false,
ADD COLUMN     "status" BOOLEAN DEFAULT true,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false,
ADD COLUMN     "status" BOOLEAN DEFAULT true,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

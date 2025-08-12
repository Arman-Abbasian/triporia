-- CreateEnum
CREATE TYPE "Status" AS ENUM ('accepted', 'rejected', 'pending');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending';

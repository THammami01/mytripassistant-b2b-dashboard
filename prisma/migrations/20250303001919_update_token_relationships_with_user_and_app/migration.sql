/*
  Warnings:

  - You are about to drop the column `userId` on the `Token` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- DropIndex
DROP INDEX "Token_userId_key";

-- AlterTable
ALTER TABLE "App" ADD COLUMN     "reviewTokenId" TEXT;

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordResetTokenId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_passwordResetTokenId_fkey" FOREIGN KEY ("passwordResetTokenId") REFERENCES "Token"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_reviewTokenId_fkey" FOREIGN KEY ("reviewTokenId") REFERENCES "Token"("id") ON DELETE SET NULL ON UPDATE CASCADE;

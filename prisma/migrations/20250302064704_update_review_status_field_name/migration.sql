/*
  Warnings:

  - You are about to drop the column `status` on the `App` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AppReviewStatus" AS ENUM ('PENDING', 'REJECTED', 'ACCEPTED');

-- AlterTable
ALTER TABLE "App" DROP COLUMN "status",
ADD COLUMN     "reviewStatus" "AppReviewStatus" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "AppStatus";

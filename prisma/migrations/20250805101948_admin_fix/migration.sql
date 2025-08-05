/*
  Warnings:

  - Made the column `ratingId` on table `comments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."comments" DROP CONSTRAINT "comments_ratingId_fkey";

-- AlterTable
ALTER TABLE "public"."admins" ADD COLUMN     "approval_link" TEXT;

-- AlterTable
ALTER TABLE "public"."comments" ALTER COLUMN "ratingId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "public"."ratings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

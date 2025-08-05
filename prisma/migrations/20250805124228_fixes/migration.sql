/*
  Warnings:

  - You are about to drop the column `subscriptionId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `is_premium` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `premium_expiration` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."payments" DROP CONSTRAINT "payments_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "public"."payments" DROP COLUMN "subscriptionId",
ADD COLUMN     "userSubscriptionId" INTEGER;

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "is_premium",
DROP COLUMN "premium_expiration";

-- CreateTable
CREATE TABLE "public"."user_subscriptions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "subscriptionId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_subscriptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."user_subscriptions" ADD CONSTRAINT "user_subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_subscriptions" ADD CONSTRAINT "user_subscriptions_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "public"."subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_userSubscriptionId_fkey" FOREIGN KEY ("userSubscriptionId") REFERENCES "public"."user_subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

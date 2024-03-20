/*
  Warnings:

  - A unique constraint covering the columns `[stripe_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "available_states" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "is_subscribed" BOOLEAN DEFAULT false,
ADD COLUMN     "stripe_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_stripe_id_key" ON "user"("stripe_id");

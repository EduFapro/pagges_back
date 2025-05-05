/*
  Warnings:

  - You are about to drop the `user_seguindo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_seguindo" DROP CONSTRAINT "user_seguindo_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "user_seguindo" DROP CONSTRAINT "user_seguindo_following_id_fkey";

-- DropTable
DROP TABLE "user_seguindo";

-- CreateTable
CREATE TABLE "user_follow" (
    "follower_id" INTEGER NOT NULL,
    "following_id" INTEGER NOT NULL,

    CONSTRAINT "user_follow_pkey" PRIMARY KEY ("follower_id","following_id")
);

-- AddForeignKey
ALTER TABLE "user_follow" ADD CONSTRAINT "user_follow_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_follow" ADD CONSTRAINT "user_follow_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

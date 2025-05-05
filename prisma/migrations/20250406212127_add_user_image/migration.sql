/*
  Warnings:

  - You are about to drop the column `is_comment` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `isbn` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "alternative" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "book" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "challenge" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "challenge_user" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "post" DROP COLUMN "is_comment",
DROP COLUMN "isbn",
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_review" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parent_id" INTEGER;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profile_image" BYTEA;

-- AlterTable
ALTER TABLE "user_follow" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "post"("post_id") ON DELETE SET NULL ON UPDATE CASCADE;

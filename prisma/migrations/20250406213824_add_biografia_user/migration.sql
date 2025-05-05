/*
  Warnings:

  - Added the required column `biography` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "biography" VARCHAR(250) NOT NULL;

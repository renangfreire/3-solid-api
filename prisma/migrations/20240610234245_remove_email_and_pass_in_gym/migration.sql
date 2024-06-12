/*
  Warnings:

  - You are about to drop the column `email` on the `gyms` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `gyms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gyms" DROP COLUMN "email",
DROP COLUMN "password_hash";

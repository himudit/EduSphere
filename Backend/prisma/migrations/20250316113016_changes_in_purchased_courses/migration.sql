/*
  Warnings:

  - The primary key for the `purchased_courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `order_id` to the `purchased_courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchased_courses" DROP CONSTRAINT "purchased_courses_pkey",
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD CONSTRAINT "purchased_courses_pkey" PRIMARY KEY ("order_id");

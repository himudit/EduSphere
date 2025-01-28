/*
  Warnings:

  - You are about to drop the column `student_twiter` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "student_twiter",
ADD COLUMN     "student_twitter" TEXT;

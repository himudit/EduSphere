/*
  Warnings:

  - The primary key for the `teacher_courses` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "teacher_courses" DROP CONSTRAINT "teacher_courses_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "teacher_courses_pkey" PRIMARY KEY ("id");

/*
  Warnings:

  - You are about to drop the column `teacher_specilization` on the `teachers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "teacher_specilization",
ADD COLUMN     "teacher_skills" TEXT[] DEFAULT ARRAY[]::TEXT[];

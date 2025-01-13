/*
  Warnings:

  - The primary key for the `teachers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[teacher_id]` on the table `teachers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_pkey",
ALTER COLUMN "teacher_id" DROP DEFAULT,
ALTER COLUMN "teacher_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "teachers_pkey" PRIMARY KEY ("teacher_id");
DROP SEQUENCE "teachers_teacher_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "teachers_teacher_id_key" ON "teachers"("teacher_id");

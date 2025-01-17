/*
  Warnings:

  - You are about to alter the column `course_total_no_hours` on the `courses` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(3,1)`.
  - You are about to alter the column `lecture_total_no_hours` on the `lectures` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(3,1)`.
  - You are about to alter the column `video_total_no_of_hours` on the `videos` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(3,1)`.

*/
-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "course_total_no_hours" SET DATA TYPE DECIMAL(3,1);

-- AlterTable
ALTER TABLE "lectures" ALTER COLUMN "lecture_total_no_hours" SET DATA TYPE DECIMAL(3,1);

-- AlterTable
ALTER TABLE "videos" ALTER COLUMN "video_total_no_of_hours" SET DATA TYPE DECIMAL(3,1);

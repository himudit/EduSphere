-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "course_level" TEXT[] DEFAULT ARRAY['Intermediate']::TEXT[];

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "course_keywords" TEXT[] DEFAULT ARRAY[]::TEXT[];

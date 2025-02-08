-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "course_level" SET NOT NULL,
ALTER COLUMN "course_level" SET DEFAULT 'Intermediate',
ALTER COLUMN "course_level" SET DATA TYPE TEXT;

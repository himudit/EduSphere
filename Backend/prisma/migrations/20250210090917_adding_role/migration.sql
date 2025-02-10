-- AlterTable
ALTER TABLE "students" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'students';

-- AlterTable
ALTER TABLE "teachers" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'teachers';

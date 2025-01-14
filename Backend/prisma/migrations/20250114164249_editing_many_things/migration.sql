/*
  Warnings:

  - Added the required column `video_order` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_title` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_total_no_of_hours` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "course_preview_video" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dy8jwwm6j/video/upload/v1736872825/12927954_1920_1080_24fps_szansr.mp4',
ADD COLUMN     "course_what_you_will_learn" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "student_about" TEXT DEFAULT 'This is default about',
ADD COLUMN     "student_gender" "Gender" NOT NULL DEFAULT 'MALE',
ADD COLUMN     "student_profile_picture" TEXT DEFAULT 'https://static.vecteezy.com/system/resources/previews/045/944/199/non_2x/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg',
ADD COLUMN     "student_skills" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "teachers" ADD COLUMN     "teacher_about" TEXT DEFAULT 'This is default about',
ADD COLUMN     "teacher_gender" "Gender" NOT NULL DEFAULT 'MALE',
ADD COLUMN     "teacher_profile_picture" TEXT DEFAULT 'https://www.saraswatiias.com/wp-content/uploads/2018/11/dummy-profile-pic-male1.jpg',
ADD COLUMN     "teacher_specilization" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "video_order" INTEGER NOT NULL,
ADD COLUMN     "video_title" TEXT NOT NULL,
ADD COLUMN     "video_total_no_of_hours" INTEGER NOT NULL;

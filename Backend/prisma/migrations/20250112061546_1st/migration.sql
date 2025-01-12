/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "students" (
    "student_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "purchased_courses" (
    "student_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL,
    "progress" INTEGER NOT NULL,

    CONSTRAINT "purchased_courses_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "teacher_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "teacher_courses" (
    "teacher_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teacher_courses_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "courses" (
    "course_id" TEXT NOT NULL,
    "course_title" TEXT NOT NULL,
    "course_description" TEXT NOT NULL,
    "course_price" INTEGER NOT NULL,
    "course_thumbnail" TEXT NOT NULL,
    "course_no_of_purchase" INTEGER NOT NULL DEFAULT 0,
    "course_total_no_hours" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 1,
    "creation" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "lectures" (
    "lecture_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "lecture_title" TEXT NOT NULL,
    "lecture_description" TEXT NOT NULL,
    "lecture_order" INTEGER NOT NULL,
    "lecture_total_no_hours" INTEGER NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lectures_pkey" PRIMARY KEY ("lecture_id")
);

-- CreateTable
CREATE TABLE "videos" (
    "video_id" TEXT NOT NULL,
    "lecture_id" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("video_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_student_id_key" ON "students"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_email_key" ON "teachers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "courses_course_id_key" ON "courses"("course_id");

-- CreateIndex
CREATE UNIQUE INDEX "lectures_lecture_id_key" ON "lectures"("lecture_id");

-- CreateIndex
CREATE UNIQUE INDEX "videos_video_id_key" ON "videos"("video_id");

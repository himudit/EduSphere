-- DropForeignKey
ALTER TABLE "lectures" DROP CONSTRAINT "lectures_course_id_fkey";

-- DropForeignKey
ALTER TABLE "purchased_courses" DROP CONSTRAINT "purchased_courses_course_id_fkey";

-- DropForeignKey
ALTER TABLE "purchased_courses" DROP CONSTRAINT "purchased_courses_student_id_fkey";

-- DropForeignKey
ALTER TABLE "teacher_courses" DROP CONSTRAINT "teacher_courses_course_id_fkey";

-- DropForeignKey
ALTER TABLE "teacher_courses" DROP CONSTRAINT "teacher_courses_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "videos" DROP CONSTRAINT "videos_lecture_id_fkey";

-- AddForeignKey
ALTER TABLE "purchased_courses" ADD CONSTRAINT "purchased_courses_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchased_courses" ADD CONSTRAINT "purchased_courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("course_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_courses" ADD CONSTRAINT "teacher_courses_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_courses" ADD CONSTRAINT "teacher_courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("course_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lectures" ADD CONSTRAINT "lectures_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("course_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "lectures"("lecture_id") ON DELETE CASCADE ON UPDATE CASCADE;

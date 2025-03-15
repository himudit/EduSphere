import http from 'http';
import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/students.routes'
import teacherRoutes from './routes/teachers.routes'
import paymentRoutes from './routes/payment'

import cookieParser from 'cookie-parser'
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { authStudent, authTeacher } from './middlewares/auth.middleware';
import upload from './multerConfig';
import cloudinary from "./cloudinaryConfig";
const app = express();

const prisma = new PrismaClient();

app.use(cookieParser());
app.use(cors({
    credentials: true,
}));
app.use(express.json());
app.use('/api', (req, res) => {
    res.send('Hello from server')
});

app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/payment', paymentRoutes);

app.get('/rating', async (req: Request, res: Response) => {
    try {
        const courses = await prisma.courses.findMany();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
});

app.get('/course/:course_id', async (req: Request, res: Response) => {
    try {
        const course = await prisma.courses.findUnique({
            where: { course_id: req.params.course_id },
            include: {
                lectures: {
                    include: {
                        videos: true,
                    },
                },
            },
        })
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        const teacherCourse = await prisma.teacher_courses.findFirst({
            where: { course_id: req.params.course_id },
            include: { teacher: true }
        });
        if (teacherCourse) {
            res.status(200).json({
                course,
                teacherCourse
            });
        } else {
            res.status(200).json(course);
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch course' });
    }
})


app.get('/search', async (req: Request, res: Response) => {
    try {
        const course = await prisma.courses.findMany()
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch course' });
    }
})


app.get('/filterSearch', async (req: Request, res: Response) => {
    try {
        const { topic, level, rating } = req.query;

        let filter: any = {};

        let minRating: number | undefined;
        const ratingStr = typeof rating === "string" ? rating : undefined;

        if (ratingStr) {
            if (ratingStr.includes("& up")) {
                minRating = parseFloat(ratingStr.split(" & up")[0]);
            } else if (ratingStr.includes("& below")) {
                minRating = parseFloat(ratingStr.split(" & below")[0]);
            }
        }

        let topicsArray: string[] = [];
        if (typeof topic === "string") {
            topicsArray = [topic];
        } else if (Array.isArray(topic)) {
            topicsArray = topic.map(t => String(t)); 
        }

        const levelStr = typeof level === "string" ? level : undefined;

        const courses = await prisma.courses.findMany({
            where: {
                AND: [
                    levelStr ? { course_level: levelStr } : {}, 
                    topicsArray.length > 0 ? { course_keywords: { hasSome: topicsArray } } : {}, 
                    minRating !== undefined
                        ? ratingStr?.includes("below")
                            ? { rating: { lte: minRating } }
                            : { rating: { gte: minRating } }
                        : {}
                ]
            },
        });
        if (!courses.length) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
});


interface StudentRequest extends Request {
    student?: {
        student_id: string;
    }
}
app.patch('/students/profile/edit', authStudent, async  (req: StudentRequest, res: Response) => {
    const {
        first_name,
        last_name,
        student_about,
        student_address,
        student_gender,
        student_github,
        student_linkedin,
        student_mobile,
        student_profile_picture,
        student_skills,
        student_twitter,
        student_university
    } = req.body;
    const student_id = req.student?.student_id;
    if (!student_id) {
        return res.status(400).json({ error: 'Student ID is required' });
    }
    try {
        const updatedStudent = await prisma.students.update({
            where: { student_id }, 
            data: {
                first_name,
                last_name,
                student_about,
                student_address,
                student_gender,
                student_github,
                student_linkedin,
                student_mobile,
                student_profile_picture,
                student_skills,
                student_twitter,
                student_university
            }
        });

        res.status(200).json(updatedStudent);
    } catch (err) {
        console.error('Error updating student profile:', err);
        res.status(500).json({ error: 'Failed to update profile', details: err });
    }
});

app.post("/students/profile/upload/image", upload.single("image"), authStudent, async (req: StudentRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        cloudinary.uploader.upload_stream({ folder: "profile_pictures" }, async (error, result) => {
            if (error) {
                return res.status(500).json({ error: "Cloudinary upload failed" });
            }
            const student_id = req.student?.student_id;
            const updatedStudent = await prisma.students.update({
                where: { student_id: student_id },
                data: { student_profile_picture: result?.secure_url },
            });
            return res.status(200).json({ imageUrl: result?.secure_url });
        }).end(req.file.buffer);
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

interface TeacherRequest extends Request {
    teacher?: {
        teacher_id: string;
    }
}
app.patch('/teachers/profile/edit', authTeacher,  async (req: TeacherRequest, res: Response) => {
    const {
        first_name,
        last_name,
        teacher_about,
        teacher_gender,
        teacher_profile_picture,
        teacher_skills,
    } = req.body;
    const teacher_id = req.teacher?.teacher_id;
    if (!teacher_id) {
        return res.status(400).json({ error: 'Student ID is required' });
    }
    try {
        const updatedTeacher = await prisma.teachers.update({
            where: { teacher_id }, 
            data: {
                first_name,
                last_name,
                teacher_about,
                teacher_gender,
                teacher_profile_picture,
                teacher_skills,
            }
        });

        res.status(200).json(updatedTeacher);
    } catch (err) {
        console.error('Error updating student profile:', err);
        res.status(500).json({ error: 'Failed to update profile', details: err });
    }
});

app.post("/teachers/profile/upload/image", upload.single("image"), authTeacher, async (req: TeacherRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        cloudinary.uploader.upload_stream({ folder: "profile_pictures" }, async (error, result) => {
            if (error) {
                return res.status(500).json({ error: "Cloudinary upload failed" });
            }
            const teacher_id = req.teacher?.teacher_id;
            const updatedStudent = await prisma.teachers.update({
                where: { teacher_id: teacher_id },
                data: { teacher_profile_picture: result?.secure_url },
            });
            return res.status(200).json({ imageUrl: result?.secure_url });
        }).end(req.file.buffer);
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.post('/teachers/course/upload', authTeacher, async (req: TeacherRequest, res: Response) => {
    try {
        const teacher_id = req.teacher?.teacher_id;
        // Validate required fields
        if (!teacher_id) {
            return res.status(400).json({ error: 'Teacher ID is required' });
        }
        const {
            course_id,
            course_title,
            course_description,
            course_price,
            course_thumbnail = " ",
            course_no_of_purchase,
            course_total_no_hours,
            rating,
            creation,
            course_preview_video,
            course_what_you_will_learn,
            course_author,
            course_keywords,
            course_level
        } = req.body;
        const response = await prisma.courses.create({
            data: {
                course_id,
                course_title,
                course_description,
                course_price,
                course_thumbnail,
                course_no_of_purchase,
                course_total_no_hours,
                rating,
                creation,
                course_preview_video,
                course_what_you_will_learn,
                course_author,
                course_keywords,
                course_level
            }
        })
        const response2 = await prisma.teacher_courses.create({
            data: {
                teacher_id,
                course_id,
                creation
            }
        })
        return res.json(response);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error uploading Lecture Data:", err);
            res.status(500).json({ error: "Failed to upload data", details: err.message });
        } else {
            // Handle non-Error objects
            console.error("Unknown error:", err);
            res.status(500).json({ error: "Failed to upload data", details: "Unknown error" });
        }
    }
})

app.post('/teachers/lecture/upload', authTeacher, async (req, res) => {
    try {
        const {
            lecture_id,
            course_id,
            lecture_title,
            lecture_description,
            lecture_order,
            lecture_total_no_hours,
            creation
        } = req.body;
        const response = await prisma.lectures.create({
            data: {
                lecture_id,
                course_id,
                lecture_title,
                lecture_description,
                lecture_order,
                lecture_total_no_hours,
                creation,
            }
        })
        return res.json(response);

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error uploading Lecture Data:", err);
            res.status(500).json({ error: "Failed to upload data", details: err.message });
        } else {
            // Handle non-Error objects
            console.error("Unknown error:", err);
            res.status(500).json({ error: "Failed to upload data", details: "Unknown error" });
        }
    }
})

app.post('/teachers/video/upload', authTeacher, async (req, res) => {
    try {
        const {
            video_id,
            lecture_id,
            video_title,
            video_url,
            video_order,
            video_total_no_of_hours,
            creation
        } = req.body;
        const response = await prisma.videos.create({
            data: {
                video_id,
                lecture_id,
                video_title,
                video_url,
                video_order,
                video_total_no_of_hours,
                creation
            }
        })
        return res.json(response);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error uploading Lecture Data:", err);
            res.status(500).json({ error: "Failed to upload data", details: err.message });
        } else {
            // Handle non-Error objects
            console.error("Unknown error:", err);
            res.status(500).json({ error: "Failed to upload data", details: "Unknown error" });
        }
    }
})

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


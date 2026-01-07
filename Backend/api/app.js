"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import compression from "compression";
// import { authStudent, authTeacher } from './middlewares/auth.middleware';
// import studentRoutes from "./routes/students.routes";
// import teacherRoutes from "./routes/teachers.routes";
// import paymentRoutes from "./routes/payment";
// import upload from './multerConfig';
// import cloudinary from "./cloudinaryConfig";
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const students_routes_1 = __importDefault(require("./routes/students.routes"));
const teachers_routes_1 = __importDefault(require("./routes/teachers.routes"));
const payment_1 = __importDefault(require("./routes/payment"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const client_1 = require("@prisma/client");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const multerConfig_1 = __importDefault(require("./multerConfig"));
const cloudinaryConfig_1 = __importDefault(require("./cloudinaryConfig"));
const compression_1 = __importDefault(require("compression"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ credentials: true }));
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use("/api", (req, res) => {
    res.send("Hello from server");
});
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.use("/students", students_routes_1.default);
app.use("/teachers", teachers_routes_1.default);
app.use("/payment", payment_1.default);
// ALL your routes stay exactly the same below 👇
// /rating, /v3/rating, /search, etc.
app.use('/students', students_routes_1.default);
app.use('/teachers', teachers_routes_1.default);
app.use('/payment', payment_1.default);
app.get('/students/mylearning', auth_middleware_1.authStudent, async (req, res) => {
    try {
        const purchasedCourses = await prisma.purchased_courses.findMany({
            where: { student_id: req.student?.student_id },
            include: {
                course: true
            }
        });
        if (purchasedCourses.length === 0) {
            return res.status(200).json({
                message: "No purchased courses found.",
                purchasedCourses: []
            });
        }
        res.status(200).json({ purchasedCourses });
    }
    catch (error) {
        console.error("Error fetching purchased courses:", error);
        res.status(500).json({ message: "Failed to fetch purchased courses", error });
    }
});
app.post('/students/CheckPurchasedOrNot', auth_middleware_1.authStudent, async (req, res) => {
    try {
        const { courseId } = req.body;
        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required." });
        }
        const purchasedCourse = await prisma.purchased_courses.findFirst({
            where: {
                student_id: req.student?.student_id,
                course_id: courseId,
            },
        });
        const isPurchased = !!purchasedCourse; // true if found, false otherwise
        res.status(200).json(isPurchased);
    }
    catch (error) {
        console.error("Error checking purchased course:", error);
        res.status(500).json({ message: "Failed to check purchased course", error });
    }
});
app.get('/rating', async (req, res) => {
    try {
        const courses = await prisma.courses.findMany({
            orderBy: {
                rating: 'desc',
            },
            take: 3,
        });
        res.status(200).json(courses);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
});
app.get('/v3/rating', async (req, res) => {
    try {
        const cacheKey = 'courses_rating_all_v3';
        // Check Redis Cloud cache
        // const cachedCourses = await redisCloud.get(cacheKey);
        // if (cachedCourses) {
        //     console.log('✅ Cache hit (Redis Cloud)');
        //     return res.status(200).json(JSON.parse(cachedCourses));
        // }
        // Query from DB if not in cache
        const courses = await prisma.courses.findMany({
            orderBy: {
                rating: 'desc',
            },
            take: 3,
        });
        // Save result to Redis Cloud with TTL of 1 hour
        // await redisCloud.set(cacheKey, JSON.stringify(courses), { EX: 3600 });
        return res.status(200).json(courses);
    }
    catch (error) {
        console.error('❌ Error in /v3/rating:', error);
        return res.status(500).json({ error: 'Failed to fetch courses' });
    }
});
app.get('/course/:course_id', async (req, res) => {
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
        });
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
        }
        else {
            res.status(200).json(course);
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch course' });
    }
});
// eubuehihii3
// app.get('/search', async (req: Request, res: Response) => {
//     try {
//         console.log("een");
//         const query = (req.query.q || req.query.query) as string;
//         if (!query || typeof query !== 'string') {
//             return res.status(400).json({ error: 'Search query is required' });
//         }
//         const searchTerm = query.toString().toLowerCase();
//         const allCourses = await prisma.courses.findMany();
//         const filteredCourses = allCourses.filter(course =>
//             course.course_keywords.some(keyword =>
//                 keyword.toLowerCase().includes(searchTerm)
//             )
//         );
//         if (!filteredCourses.length) {
//             return res.status(404).json({ error: "No matching courses found" });
//         }
//         res.status(200).json(filteredCourses);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to search courses' });
//     }
// });
app.get('/v1/search', async (req, res) => {
    try {
        const allCourses = await prisma.courses.findMany();
        return res.status(200).json(allCourses);
    }
    catch (err) {
        console.error('Error fetching courses:', err);
        return res.status(500).json({ error: 'Failed to fetch courses' });
    }
});
app.get('/v2/search', async (req, res) => {
    try {
        const cacheKey = 'all_courses';
        // Check cache
        // const cachedCourses = await redisCloud.get(cacheKey);
        // if (cachedCourses) {
        //     return res.status(200).json(JSON.parse(cachedCourses));
        // }
        // Cache miss: fetch from DB
        const allCourses = await prisma.courses.findMany();
        // Store in cache with 1-hour TTL
        // await redisCloud.set(cacheKey, JSON.stringify(allCourses), { EX: 3600 });
        console.log('💾 Cache set for /search');
        return res.status(200).json(allCourses);
    }
    catch (err) {
        console.error('❌ Error fetching courses:', err);
        return res.status(500).json({ error: 'Failed to fetch courses' });
    }
});
app.get('/filterSearch', async (req, res) => {
    try {
        const { topic, level, rating } = req.query;
        let filter = {};
        let minRating;
        const ratingStr = typeof rating === "string" ? rating : undefined;
        if (ratingStr) {
            if (ratingStr.includes("& up")) {
                minRating = parseFloat(ratingStr.split(" & up")[0]);
            }
            else if (ratingStr.includes("& below")) {
                minRating = parseFloat(ratingStr.split(" & below")[0]);
            }
        }
        let topicsArray = [];
        if (typeof topic === "string") {
            topicsArray = [topic];
        }
        else if (Array.isArray(topic)) {
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
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
});
app.patch('/students/profile/edit', auth_middleware_1.authStudent, async (req, res) => {
    const { first_name, last_name, student_about, student_address, student_gender, student_github, student_linkedin, student_mobile, student_profile_picture, student_skills, student_twitter, student_university } = req.body;
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
    }
    catch (err) {
        console.error('Error updating student profile:', err);
        res.status(500).json({ error: 'Failed to update profile', details: err });
    }
});
app.post("/students/profile/upload/image", multerConfig_1.default.single("image"), auth_middleware_1.authStudent, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        cloudinaryConfig_1.default.uploader.upload_stream({ folder: "profile_pictures" }, async (error, result) => {
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
    }
    catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.patch('/teachers/profile/edit', auth_middleware_1.authTeacher, async (req, res) => {
    const { first_name, last_name, teacher_about, teacher_gender, teacher_profile_picture, teacher_skills, } = req.body;
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
    }
    catch (err) {
        console.error('Error updating student profile:', err);
        res.status(500).json({ error: 'Failed to update profile', details: err });
    }
});
app.post("/teachers/profile/upload/image", multerConfig_1.default.single("image"), auth_middleware_1.authTeacher, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        cloudinaryConfig_1.default.uploader.upload_stream({ folder: "profile_pictures" }, async (error, result) => {
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
    }
    catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.post('/teachers/course/upload', auth_middleware_1.authTeacher, async (req, res) => {
    try {
        const teacher_id = req.teacher?.teacher_id;
        // Validate required fields
        if (!teacher_id) {
            return res.status(400).json({ error: 'Teacher ID is required' });
        }
        const { course_id, course_title, course_description, course_price, course_thumbnail = " ", course_no_of_purchase, course_total_no_hours, rating, creation, course_preview_video, course_what_you_will_learn, course_author, course_keywords, course_level } = req.body;
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
        });
        const response2 = await prisma.teacher_courses.create({
            data: {
                teacher_id,
                course_id,
                creation
            }
        });
        return res.json(response);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error uploading Lecture Data:", err);
            res.status(500).json({ error: "Failed to upload data", details: err.message });
        }
        else {
            // Handle non-Error objects
            console.error("Unknown error:", err);
            res.status(500).json({ error: "Failed to upload data", details: "Unknown error" });
        }
    }
});
app.post('/teachers/lecture/upload', auth_middleware_1.authTeacher, async (req, res) => {
    try {
        const { lecture_id, course_id, lecture_title, lecture_description, lecture_order, lecture_total_no_hours, creation } = req.body;
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
        });
        return res.json(response);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error uploading Lecture Data:", err);
            res.status(500).json({ error: "Failed to upload data", details: err.message });
        }
        else {
            // Handle non-Error objects
            console.error("Unknown error:", err);
            res.status(500).json({ error: "Failed to upload data", details: "Unknown error" });
        }
    }
});
app.post('/teachers/video/upload', auth_middleware_1.authTeacher, async (req, res) => {
    try {
        const { video_id, lecture_id, video_title, video_url, video_order, video_total_no_of_hours, creation } = req.body;
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
        });
        return res.json(response);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error uploading Lecture Data:", err);
            res.status(500).json({ error: "Failed to upload data", details: err.message });
        }
        else {
            // Handle non-Error objects
            console.error("Unknown error:", err);
            res.status(500).json({ error: "Failed to upload data", details: "Unknown error" });
        }
    }
});
exports.default = app;

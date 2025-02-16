"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const students_routes_1 = __importDefault(require("./routes/students.routes"));
const teachers_routes_1 = __importDefault(require("./routes/teachers.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const client_1 = require("@prisma/client");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const multerConfig_1 = __importDefault(require("./multerConfig"));
const cloudinaryConfig_1 = __importDefault(require("./cloudinaryConfig"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use(express_1.default.json());
app.use('/api', (req, res) => {
    res.send('Hello from server');
});
app.use('/students', students_routes_1.default);
app.use('/teachers', teachers_routes_1.default);
app.get('/rating', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield prisma.courses.findMany();
        res.status(200).json(courses);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
}));
app.get('/course/:course_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield prisma.courses.findUnique({
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
        const teacherCourse = yield prisma.teacher_courses.findFirst({
            where: { course_id: req.params.course_id },
            include: { teacher: true } // Include related teacher details
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
}));
app.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield prisma.courses.findMany();
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch course' });
    }
}));
app.get('/filterSearch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { topic, level, rating } = req.query;
        let filter = {};
        let minRating;
        if (rating) {
            if (rating.includes("& up")) {
                minRating = parseFloat(rating.split(" & up")[0]);
            }
            else if (rating.includes("& below")) {
                minRating = parseFloat(rating.split(" & below")[0]);
            }
        }
        const courses = yield prisma.courses.findMany({
            where: {
                AND: [
                    level ? { course_level: level } : {},
                    (topic === null || topic === void 0 ? void 0 : topic.length) > 0 ? { course_keywords: { hasSome: topic } } : {},
                    minRating !== undefined
                        ? rating.includes("below")
                            ? { rating: { lte: minRating } }
                            : { rating: { gte: minRating } }
                        : {}
                ]
            },
        });
        if (!courses) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(courses);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch course' });
    }
}));
app.patch('/students/profile/edit', auth_middleware_1.authStudent, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, student_about, student_address, student_gender, student_github, student_linkedin, student_mobile, student_profile_picture, student_skills, student_twitter, student_university } = req.body;
    const student_id = req.student.student_id;
    // Validate required fields
    if (!student_id) {
        return res.status(400).json({ error: 'Student ID is required' });
    }
    try {
        // Update the student profile in the database
        const updatedStudent = yield prisma.students.update({
            where: { student_id }, // Use the student_id to find the record
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
}));
app.post("/students/profile/upload/image", multerConfig_1.default.single("image"), auth_middleware_1.authStudent, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        cloudinaryConfig_1.default.uploader.upload_stream({ folder: "profile_pictures" }, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return res.status(500).json({ error: "Cloudinary upload failed" });
            }
            const student_id = req.student.student_id;
            const updatedStudent = yield prisma.students.update({
                where: { student_id: student_id },
                data: { student_profile_picture: result === null || result === void 0 ? void 0 : result.secure_url },
            });
            return res.status(200).json({ imageUrl: result === null || result === void 0 ? void 0 : result.secure_url });
        })).end(req.file.buffer);
    }
    catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.patch('/teachers/profile/edit', auth_middleware_1.authTeacher, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, teacher_about, teacher_gender, teacher_profile_picture, teacher_skills, } = req.body;
    const teacher_id = req.teacher.teacher_id;
    // Validate required fields
    if (!teacher_id) {
        return res.status(400).json({ error: 'Student ID is required' });
    }
    try {
        // Update the student profile in the database
        const updatedTeacher = yield prisma.teachers.update({
            where: { teacher_id }, // Use the student_id to find the record
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
}));
app.post("/teachers/profile/upload/image", multerConfig_1.default.single("image"), auth_middleware_1.authTeacher, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        cloudinaryConfig_1.default.uploader.upload_stream({ folder: "profile_pictures" }, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return res.status(500).json({ error: "Cloudinary upload failed" });
            }
            const teacher_id = req.teacher.teacher_id;
            const updatedStudent = yield prisma.teachers.update({
                where: { teacher_id: teacher_id },
                data: { teacher_profile_picture: result === null || result === void 0 ? void 0 : result.secure_url },
            });
            return res.status(200).json({ imageUrl: result === null || result === void 0 ? void 0 : result.secure_url });
        })).end(req.file.buffer);
    }
    catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.post('/teachers/course/upload', auth_middleware_1.authTeacher, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher_id = req.teacher.teacher_id;
        // Validate required fields
        if (!teacher_id) {
            return res.status(400).json({ error: 'Student ID is required' });
        }
        const { course_id, course_title, course_description, course_price, course_thumbnail = " ", course_no_of_purchase, course_total_no_hours, rating, creation, course_preview_video, course_what_you_will_learn, course_author, course_keywords, course_level } = req.body;
        const response = yield prisma.courses.create({
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
        const response2 = yield prisma.teacher_courses.create({
            data: {
                teacher_id,
                course_id,
                creation
            }
        });
        return res.json(response);
    }
    catch (err) {
        console.error("Error uploading Course Data:", err);
        res.status(500).json({ error: "Failed to upload data", details: err.message });
    }
}));
app.post('/teachers/lecture/upload', auth_middleware_1.authTeacher, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lecture_id, course_id, lecture_title, lecture_description, lecture_order, lecture_total_no_hours, creation } = req.body;
        const response = yield prisma.lectures.create({
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
        console.error("Error uploading Lecture Data:", err);
        res.status(500).json({ error: "Failed to upload data", details: err.message });
    }
}));
app.post('/teachers/video/upload', auth_middleware_1.authTeacher, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { video_id, lecture_id, video_title, video_url, video_order, video_total_no_of_hours, creation } = req.body;
        const response = yield prisma.videos.create({
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
        console.error("Error uploading Lecture Data:", err);
        res.status(500).json({ error: "Failed to upload data", details: err.message });
    }
}));
const port = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

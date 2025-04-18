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
const payment_1 = __importDefault(require("./routes/payment"));
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
app.use('/payment', payment_1.default);
app.get('/students/mylearning', auth_middleware_1.authStudent, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const purchasedCourses = yield prisma.purchased_courses.findMany({
            where: { student_id: (_a = req.student) === null || _a === void 0 ? void 0 : _a.student_id },
            include: {
                course: true
            }
        });
        if (purchasedCourses.length === 0) {
            return res.status(404).json({ message: "No purchased courses found for this student." });
        }
        res.status(200).json({ purchasedCourses });
    }
    catch (error) {
        console.error("Error fetching purchased courses:", error);
        res.status(500).json({ message: "Failed to fetch purchased courses", error });
    }
}));
app.post('/students/CheckPurchasedOrNot', auth_middleware_1.authStudent, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { courseId } = req.body;
        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required." });
        }
        const purchasedCourse = yield prisma.purchased_courses.findFirst({
            where: {
                student_id: (_a = req.student) === null || _a === void 0 ? void 0 : _a.student_id,
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
}));
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
}));
app.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = (req.query.q || req.query.query);
        if (!query || typeof query !== 'string') {
            return res.status(400).json({ error: 'Search query is required' });
        }
        const searchTerm = query.toString().toLowerCase();
        const allCourses = yield prisma.courses.findMany();
        const filteredCourses = allCourses.filter(course => course.course_keywords.some(keyword => keyword.toLowerCase().includes(searchTerm)));
        if (!filteredCourses.length) {
            return res.status(404).json({ error: "No matching courses found" });
        }
        res.status(200).json(filteredCourses);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to search courses' });
    }
}));
app.get('/filterSearch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const courses = yield prisma.courses.findMany({
            where: {
                AND: [
                    levelStr ? { course_level: levelStr } : {},
                    topicsArray.length > 0 ? { course_keywords: { hasSome: topicsArray } } : {},
                    minRating !== undefined
                        ? (ratingStr === null || ratingStr === void 0 ? void 0 : ratingStr.includes("below"))
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
}));
app.patch('/students/profile/edit', auth_middleware_1.authStudent, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { first_name, last_name, student_about, student_address, student_gender, student_github, student_linkedin, student_mobile, student_profile_picture, student_skills, student_twitter, student_university } = req.body;
    const student_id = (_a = req.student) === null || _a === void 0 ? void 0 : _a.student_id;
    if (!student_id) {
        return res.status(400).json({ error: 'Student ID is required' });
    }
    try {
        const updatedStudent = yield prisma.students.update({
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
}));
app.post("/students/profile/upload/image", multerConfig_1.default.single("image"), auth_middleware_1.authStudent, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        cloudinaryConfig_1.default.uploader.upload_stream({ folder: "profile_pictures" }, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (error) {
                return res.status(500).json({ error: "Cloudinary upload failed" });
            }
            const student_id = (_a = req.student) === null || _a === void 0 ? void 0 : _a.student_id;
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
    var _a;
    const { first_name, last_name, teacher_about, teacher_gender, teacher_profile_picture, teacher_skills, } = req.body;
    const teacher_id = (_a = req.teacher) === null || _a === void 0 ? void 0 : _a.teacher_id;
    if (!teacher_id) {
        return res.status(400).json({ error: 'Student ID is required' });
    }
    try {
        const updatedTeacher = yield prisma.teachers.update({
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
}));
app.post("/teachers/profile/upload/image", multerConfig_1.default.single("image"), auth_middleware_1.authTeacher, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        cloudinaryConfig_1.default.uploader.upload_stream({ folder: "profile_pictures" }, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (error) {
                return res.status(500).json({ error: "Cloudinary upload failed" });
            }
            const teacher_id = (_a = req.teacher) === null || _a === void 0 ? void 0 : _a.teacher_id;
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
    var _a;
    try {
        const teacher_id = (_a = req.teacher) === null || _a === void 0 ? void 0 : _a.teacher_id;
        // Validate required fields
        if (!teacher_id) {
            return res.status(400).json({ error: 'Teacher ID is required' });
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
}));
const port = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

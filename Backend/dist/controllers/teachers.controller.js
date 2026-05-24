"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideo = exports.uploadLecture = exports.uploadCourse = exports.uploadProfileImage = exports.editProfile = exports.logoutTeacher = exports.getTeacherProfile = exports.loginTeacher = exports.registerTeacher = void 0;
const client_1 = require("@prisma/client");
const teachers_service_1 = require("../services/teachers.service");
const Authteachers_service_1 = __importDefault(require("../services/Authteachers.service"));
const uuid_1 = require("uuid");
const express_validator_1 = require("express-validator");
const cloudinaryConfig_1 = __importDefault(require("../cloudinaryConfig"));
const prisma = new client_1.PrismaClient();
const registerTeacher = async (req, res, next) => {
    try {
        console.log("controllers");
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { first_name, last_name, email, password } = req.body;
        const hashedPassword = await Authteachers_service_1.default.hashPassword(password);
        const teacher_id = (0, uuid_1.v4)();
        const teacher = await (0, teachers_service_1.createTeacher)({ teacher_id, first_name, last_name, email, password: hashedPassword });
        const teacher_token = Authteachers_service_1.default.generateAuthToken(teacher);
        console.log(teacher_token);
        res.cookie('tacher_token', teacher_token);
        res.status(200).json({ message: "Teacher created successfully", teacher_token });
    }
    catch (err) {
        console.log(err);
    }
};
exports.registerTeacher = registerTeacher;
const loginTeacher = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log("controllers");
        const { email, password } = req.body;
        const teacher = await prisma.teachers.findFirst({
            where: {
                email: email,
            }
        });
        if (!teacher) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await Authteachers_service_1.default.comparePassword(password, teacher.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const teacher_token = Authteachers_service_1.default.generateAuthToken(teacher);
        res.cookie('token', teacher_token);
        res.status(200).json({ teacher_token, teacher });
    }
    catch (err) {
        console.log(err);
    }
};
exports.loginTeacher = loginTeacher;
const getTeacherProfile = async (req, res, next) => {
    res.status(200).json(req.teacher);
};
exports.getTeacherProfile = getTeacherProfile;
const logoutTeacher = async (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged Out Successfully" });
};
exports.logoutTeacher = logoutTeacher;
const editProfile = async (req, res) => {
    const { first_name, last_name, teacher_about, teacher_gender, teacher_profile_picture, teacher_skills, } = req.body;
    const teacher_id = req.teacher?.teacher_id;
    if (!teacher_id) {
        return res.status(400).json({ error: 'Teacher ID is required' });
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
        console.error('Error updating teacher profile:', err);
        res.status(500).json({ error: 'Failed to update profile', details: err });
    }
};
exports.editProfile = editProfile;
const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        cloudinaryConfig_1.default.uploader.upload_stream({ folder: "profile_pictures" }, async (error, result) => {
            if (error) {
                return res.status(500).json({ error: "Cloudinary upload failed" });
            }
            const teacher_id = req.teacher?.teacher_id;
            const updatedTeacher = await prisma.teachers.update({
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
};
exports.uploadProfileImage = uploadProfileImage;
const uploadCourse = async (req, res) => {
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
            console.error("Error uploading Course Data:", err);
            res.status(500).json({ error: "Failed to upload data", details: err.message });
        }
        else {
            // Handle non-Error objects
            console.error("Unknown error:", err);
            res.status(500).json({ error: "Failed to upload data", details: "Unknown error" });
        }
    }
};
exports.uploadCourse = uploadCourse;
const uploadLecture = async (req, res) => {
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
};
exports.uploadLecture = uploadLecture;
const uploadVideo = async (req, res) => {
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
            console.error("Error uploading Video Data:", err);
            res.status(500).json({ error: "Failed to upload data", details: err.message });
        }
        else {
            // Handle non-Error objects
            console.error("Unknown error:", err);
            res.status(500).json({ error: "Failed to upload data", details: "Unknown error" });
        }
    }
};
exports.uploadVideo = uploadVideo;

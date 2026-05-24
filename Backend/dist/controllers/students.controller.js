"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfileImage = exports.editProfile = exports.checkPurchasedOrNot = exports.getMyLearning = exports.logoutStudent = exports.getStudentProfile = exports.loginStudent = exports.registerStudent = void 0;
const client_1 = require("@prisma/client");
const students_service_1 = require("../services/students.service");
const Authstudents_service_1 = __importDefault(require("../services/Authstudents.service"));
const uuid_1 = require("uuid");
const express_validator_1 = require("express-validator");
const cloudinaryConfig_1 = __importDefault(require("../cloudinaryConfig"));
const prisma = new client_1.PrismaClient();
const registerStudent = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { first_name, last_name, email, password } = req.body;
        const hashedPassword = await Authstudents_service_1.default.hashPassword(password);
        const student_id = (0, uuid_1.v4)();
        const student = await (0, students_service_1.createStudent)({ student_id, first_name, last_name, email, password: hashedPassword });
        const token = Authstudents_service_1.default.generateAuthToken(student);
        res.status(200).json({ message: "Student created successfully", token });
    }
    catch (err) {
        console.log(err);
    }
};
exports.registerStudent = registerStudent;
const loginStudent = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // console.log("controllers");
        const { email, password } = req.body;
        const student = await prisma.students.findFirst({
            where: {
                email: email,
            }
        });
        if (!student) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await Authstudents_service_1.default.comparePassword(password, student.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = Authstudents_service_1.default.generateAuthToken(student);
        res.cookie('token', token);
        res.status(200).json({ token, student });
    }
    catch (err) {
        console.log(err);
    }
};
exports.loginStudent = loginStudent;
const getStudentProfile = async (req, res, next) => {
    res.status(200).json(req.student);
};
exports.getStudentProfile = getStudentProfile;
const logoutStudent = async (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged Out Successfully" });
};
exports.logoutStudent = logoutStudent;
const getMyLearning = async (req, res) => {
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
};
exports.getMyLearning = getMyLearning;
const checkPurchasedOrNot = async (req, res) => {
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
};
exports.checkPurchasedOrNot = checkPurchasedOrNot;
const editProfile = async (req, res) => {
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
};
exports.uploadProfileImage = uploadProfileImage;

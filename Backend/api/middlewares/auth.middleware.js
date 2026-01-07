"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authTeacher = exports.authStudent = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const authStudent = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Student Unauthorized" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const student = await prisma.students.findUnique({
            where: { student_id: decoded.student_id },
        });
        req.student = student;
        return next();
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({
            message: "Student Unauthorized"
        });
    }
};
exports.authStudent = authStudent;
const authTeacher = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const teacher_token = authHeader && authHeader.split(' ')[1];
    if (!teacher_token) {
        return res.status(401).json({ message: "Teacher Unauthorized" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(teacher_token, process.env.JWT_SECRET);
        const teacher = await prisma.teachers.findUnique({
            where: { teacher_id: decoded.teacher_id },
        });
        req.teacher = teacher;
        return next();
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({
            message: "Teacher Unauthorized"
        });
    }
};
exports.authTeacher = authTeacher;

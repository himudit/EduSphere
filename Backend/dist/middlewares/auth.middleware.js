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
exports.authTeacher = exports.authStudent = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const authStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Student Unauthorized" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const student = yield prisma.students.findUnique({
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
});
exports.authStudent = authStudent;
const authTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher_token = req.cookies.token;
    if (!teacher_token) {
        return res.status(401).json({ message: "Teacher Unauthorized" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(teacher_token, process.env.JWT_SECRET);
        const teacher = yield prisma.teachers.findUnique({
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
});
exports.authTeacher = authTeacher;

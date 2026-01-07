"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutTeacher = exports.getTeacherProfile = exports.loginTeacher = exports.registerTeacher = void 0;
const client_1 = require("@prisma/client");
const teachers_service_1 = require("../services/teachers.service");
const Authteachers_service_1 = __importDefault(require("../services/Authteachers.service"));
const uuid_1 = require("uuid");
const express_validator_1 = require("express-validator");
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

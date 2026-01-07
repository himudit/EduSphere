"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutStudent = exports.getStudentProfile = exports.loginStudent = exports.registerStudent = void 0;
const client_1 = require("@prisma/client");
const students_service_1 = require("../services/students.service");
const Authstudents_service_1 = __importDefault(require("../services/Authstudents.service"));
const uuid_1 = require("uuid");
const express_validator_1 = require("express-validator");
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

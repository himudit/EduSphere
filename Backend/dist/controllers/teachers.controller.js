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
exports.logoutTeacher = exports.getTeacherProfile = exports.loginTeacher = exports.registerTeacher = void 0;
const client_1 = require("@prisma/client");
const teachers_service_1 = require("../services/teachers.service");
const Authteachers_service_1 = __importDefault(require("../services/Authteachers.service"));
const uuid_1 = require("uuid");
const express_validator_1 = require("express-validator");
const prisma = new client_1.PrismaClient();
const registerTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log("controllers");
        const { first_name, last_name, email, password } = req.body;
        const hashedPassword = yield Authteachers_service_1.default.hashPassword(password);
        const teacher_id = (0, uuid_1.v4)();
        const teacher = yield (0, teachers_service_1.createTeacher)({ teacher_id, first_name, last_name, email, password: hashedPassword });
        const teacher_token = Authteachers_service_1.default.generateAuthToken(teacher);
        res.status(200).json({ message: "Teacher created successfully", teacher_token });
    }
    catch (err) {
        console.log(err);
    }
});
exports.registerTeacher = registerTeacher;
const loginTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log("controllers");
        const { email, password } = req.body;
        const teacher = yield prisma.teachers.findFirst({
            where: {
                email: email,
            }
        });
        if (!teacher) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = yield Authteachers_service_1.default.comparePassword(password, teacher.password);
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
});
exports.loginTeacher = loginTeacher;
const getTeacherProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(req.teacher);
});
exports.getTeacherProfile = getTeacherProfile;
const logoutTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged Out Successfully" });
});
exports.logoutTeacher = logoutTeacher;

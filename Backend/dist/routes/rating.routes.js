"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const students_controller_1 = require("../controllers/students.controller");
const router = express_1.default.Router();
const auth_middleware_1 = require("../middlewares/auth.middleware");
router.get('/profile', auth_middleware_1.authStudent, students_controller_1.getStudentProfile);

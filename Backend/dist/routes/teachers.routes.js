"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teachers_controller_1 = require("../controllers/teachers.controller");
const router = express_1.default.Router();
const express_validator_1 = require("express-validator");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const multerConfig_1 = __importDefault(require("../multerConfig"));
router.post('/register', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid Email'),
    (0, express_validator_1.body)('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    (0, express_validator_1.body)('first_name').isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long'),
], teachers_controller_1.registerTeacher);
router.post('/login', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid Email'),
    (0, express_validator_1.body)('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
], teachers_controller_1.loginTeacher);
router.get('/profile', auth_middleware_1.authTeacher, teachers_controller_1.getTeacherProfile);
router.get('/logout', teachers_controller_1.logoutTeacher);
router.patch('/profile/edit', auth_middleware_1.authTeacher, teachers_controller_1.editProfile);
router.post("/profile/upload/image", auth_middleware_1.authTeacher, multerConfig_1.default.single("image"), teachers_controller_1.uploadProfileImage);
router.post('/course/upload', auth_middleware_1.authTeacher, teachers_controller_1.uploadCourse);
router.post('/lecture/upload', auth_middleware_1.authTeacher, teachers_controller_1.uploadLecture);
router.post('/video/upload', auth_middleware_1.authTeacher, teachers_controller_1.uploadVideo);
exports.default = router;

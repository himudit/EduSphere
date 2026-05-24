"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const students_controller_1 = require("../controllers/students.controller");
const router = express_1.default.Router();
const express_validator_1 = require("express-validator");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const multerConfig_1 = __importDefault(require("../multerConfig"));
router.post('/register', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid Email'),
    (0, express_validator_1.body)('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    (0, express_validator_1.body)('first_name').isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long'),
], students_controller_1.registerStudent);
router.post('/login', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid Email'),
    (0, express_validator_1.body)('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
], students_controller_1.loginStudent);
router.get('/profile', auth_middleware_1.authStudent, students_controller_1.getStudentProfile);
router.get('/logout', students_controller_1.logoutStudent);
router.get('/mylearning', auth_middleware_1.authStudent, students_controller_1.getMyLearning);
router.post('/CheckPurchasedOrNot', auth_middleware_1.authStudent, students_controller_1.checkPurchasedOrNot);
router.patch('/profile/edit', auth_middleware_1.authStudent, students_controller_1.editProfile);
router.post("/profile/upload/image", auth_middleware_1.authStudent, multerConfig_1.default.single("image"), students_controller_1.uploadProfileImage);
exports.default = router;

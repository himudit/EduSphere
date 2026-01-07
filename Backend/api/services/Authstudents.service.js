"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
class AuthService {
    // Hash password before saving
    static async hashPassword(password) {
        return await bcrypt_1.default.hash(password, 10);
    }
    // Compare password
    static async comparePassword(password, hashedPassword) {
        return await bcrypt_1.default.compare(password, hashedPassword);
    }
    // Generate JWT token
    static generateAuthToken(student) {
        return jsonwebtoken_1.default.sign({
            student_id: student.student_id,
            email: student.email,
        }, process.env.JWT_SECRET);
    }
}
exports.AuthService = AuthService;
exports.default = AuthService;

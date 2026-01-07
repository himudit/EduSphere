"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeacher = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTeacher = async ({ teacher_id, first_name, last_name, email, password }) => {
    if (!first_name || !email || !password) {
        throw new Error("All fields are required");
    }
    console.log("services");
    const newTeacher = await prisma.teachers.create({
        data: {
            teacher_id,
            first_name,
            last_name,
            email,
            password,
        },
    });
    return newTeacher;
};
exports.createTeacher = createTeacher;

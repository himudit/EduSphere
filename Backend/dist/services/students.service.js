"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudent = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createStudent = async ({ student_id, first_name, last_name, email, password }) => {
    if (!first_name || !email || !password) {
        throw new Error("All fields are required");
    }
    console.log("services");
    const newStudent = await prisma.students.create({
        data: {
            student_id,
            first_name,
            last_name,
            email,
            password,
        },
    });
    return newStudent;
};
exports.createStudent = createStudent;

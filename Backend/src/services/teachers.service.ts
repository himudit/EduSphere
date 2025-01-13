import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid"; 

const prisma = new PrismaClient();
interface Teacher {
    teacher_id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

const createTeacher = async ({ teacher_id, first_name, last_name, email, password }: Teacher) => {
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

export { createTeacher };

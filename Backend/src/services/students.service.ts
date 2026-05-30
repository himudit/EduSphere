import prisma from "../config/prisma";
interface Student {
    student_id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

const createStudent = async ({ student_id, first_name, last_name, email, password }: Student) => {
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

export { createStudent };

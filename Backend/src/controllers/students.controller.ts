import { PrismaClient } from "@prisma/client";
import { createStudent } from "../services/students.service";
import AuthService from "../services/Authstudents.service";
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

const prisma = new PrismaClient();

const registerStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log("controllers");
        const { first_name, last_name, email, password } = req.body;
        const hashedPassword = await AuthService.hashPassword(password);
        const student_id = uuidv4();
        const student = await createStudent({ student_id, first_name, last_name, email, password: hashedPassword });
        const token = AuthService.generateAuthToken(student);
        res.status(200).json({ message: "Student created successfully", token });
    } catch (err) {
        console.log(err);
    }
}

const loginStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors =
            validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // console.log("controllers");
        const { email, password } = req.body;
        const student = await prisma.students.findFirst({
            where: {
                email: email,
            }
        })
        if (!student) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await AuthService.comparePassword(password, student.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = AuthService.generateAuthToken(student);

        res.cookie('token', token);

        res.status(200).json({ token, student });

    } catch (err) {
        console.log(err);
    }
}

const getStudentProfile = async (req: any, res: Response, next: NextFunction) => {
    res.status(200).json(req.student);
}

const logoutStudent = async (req: any, res: Response, next: NextFunction) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged Out Successfully" })
}


// const getStudentCourses = async (req: any, res: Response, next: NextFunction) => {
//     try {
//         console.log("hi");
//         console.log(req.student.student_id);
//         const purchasedCourses = await prisma.purchased_courses.findMany({
//             where: { student_id: req.student.student_id },
//             include: {
//                 course: true // This will fetch course details as well
//             }
//         });

//         if (purchasedCourses.length === 0) {
//             return res.status(404).json({ message: "No purchased courses found for this student." });
//         }
//         res.status(200).json({ purchasedCourses });
//     } catch (error) {
//         console.error("Error fetching purchased courses:", error);
//         res.status(500).json({ message: "Failed to fetch purchased courses", error });
//     }
// }


export { registerStudent, loginStudent, getStudentProfile, logoutStudent };

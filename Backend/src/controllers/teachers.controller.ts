import { PrismaClient } from "@prisma/client";
import { createTeacher } from "../services/teachers.service";
import AuthService from "../services/Authteachers.service";
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

const prisma = new PrismaClient();

const registerTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log("controllers");
        const { first_name, last_name, email, password } = req.body;
        const hashedPassword = await AuthService.hashPassword(password);
        const teacher_id = uuidv4();
        const teacher = await createTeacher({ teacher_id, first_name, last_name, email, password: hashedPassword });
        const teacher_token = AuthService.generateAuthToken(teacher);
        res.status(200).json({ message: "Teacher created successfully", teacher_token });
    } catch (err) {
        console.log(err);
    }
}

const loginTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors =
            validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log("controllers");
        const { email, password } = req.body;
        const teacher = await prisma.teachers.findFirst({
            where: {
                email: email,
            }
        })
        if (!teacher) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await AuthService.comparePassword(password, teacher.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const teacher_token = AuthService.generateAuthToken(teacher);

        res.cookie('token', teacher_token);

        res.status(200).json({ teacher_token, teacher });

    } catch (err) {
        console.log(err);
    }
}

const getTeacherProfile = async (req: any, res: Response, next: NextFunction) => {
    res.status(200).json(req.teacher);
}

const logoutTeacher = async (req: any, res: Response, next: NextFunction) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged Out Successfully" })
}
export { registerTeacher, loginTeacher, getTeacherProfile, logoutTeacher };

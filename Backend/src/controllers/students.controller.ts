import { PrismaClient } from "@prisma/client";
import { createStudent } from "../services/students.service";
import AuthService from "../services/authService.service";
import { Request, Response, NextFunction } from "express";
const prisma = new PrismaClient();
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

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
        res.status(201).json({ message: "Student created successfully", token });
    } catch (err) {
        console.log(err);
    }
}

export { registerStudent };

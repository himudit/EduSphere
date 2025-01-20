import { PrismaClient, students, teachers } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient()

interface DecodedToken extends JwtPayload {
    student_id: string;
    teacher_id: string;
}

const authStudent = async (req: any, res: Response, next: NextFunction) => {
    try {
        // const token = req.cookies.token
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Student Unauthorized" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

        const student = await prisma.students.findUnique({
            where: { student_id: decoded.student_id },
        });
        req.student = student;
        return next();
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            message: "Student Unauthorized"
        })
    }
}


const authTeacher = async (req: any, res: Response, next: NextFunction) => {
    const teacher_token = req.cookies.token
    if (!teacher_token) {
        return res.status(401).json({ message: "Teacher Unauthorized" })
    }
    try {
        const decoded = jwt.verify(teacher_token, process.env.JWT_SECRET as string) as DecodedToken;

        const teacher = await prisma.teachers.findUnique({
            where: { teacher_id: decoded.teacher_id },
        });
        req.teacher = teacher;
        return next();
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            message: "Teacher Unauthorized"
        })
    }
}
export { authStudent, authTeacher };
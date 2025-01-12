import { PrismaClient, students, teachers } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient()

interface DecodedToken extends JwtPayload {
    student_id: string;
}

const authStudent = async (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "Student Unauthorized" })
    }
    try {
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
export { authStudent };
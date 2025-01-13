import { PrismaClient, students, teachers } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export class AuthService {
    // Hash password before saving
    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    // Compare password
    static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword)
    }

    // Generate JWT token
    static generateAuthToken(teacher: any): string {
        return jwt.sign(
            {
                teacher_id: teacher.teacher_id,
                email: teacher.email,
            },
            process.env.JWT_SECRET as string
        )
    }
}

export default AuthService;
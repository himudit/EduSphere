import { PrismaClient } from "@prisma/client";
import { createStudent } from "../services/students.service";
import AuthService from "../services/Authstudents.service";
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";
import cloudinary from "../cloudinaryConfig";

interface StudentRequest extends Request {
    student?: {
        student_id: string;
    }
}

const prisma = new PrismaClient();

const registerStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
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


const getMyLearning = async (req: StudentRequest, res: Response) => {
    try {
        const purchasedCourses = await prisma.purchased_courses.findMany({
            where: { student_id: req.student?.student_id },
            include: {
                course: true
            }
        });

        if (purchasedCourses.length === 0) {
            return res.status(200).json({
                message: "No purchased courses found.",
                purchasedCourses: []
            });
        }
        res.status(200).json({ purchasedCourses });
    } catch (error) {
        console.error("Error fetching purchased courses:", error);
        res.status(500).json({ message: "Failed to fetch purchased courses", error });
    }
};

const checkPurchasedOrNot = async (req: StudentRequest, res: Response) => {
    try {
        const { courseId } = req.body;

        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required." });
        }

        const purchasedCourse = await prisma.purchased_courses.findFirst({
            where: {
                student_id: req.student?.student_id,
                course_id: courseId,
            },
        });

        const isPurchased = !!purchasedCourse; // true if found, false otherwise

        res.status(200).json(isPurchased);
    } catch (error) {
        console.error("Error checking purchased course:", error);
        res.status(500).json({ message: "Failed to check purchased course", error });
    }
};

const editProfile = async (req: StudentRequest, res: Response) => {
    const {
        first_name,
        last_name,
        student_about,
        student_address,
        student_gender,
        student_github,
        student_linkedin,
        student_mobile,
        student_profile_picture,
        student_skills,
        student_twitter,
        student_university
    } = req.body;
    const student_id = req.student?.student_id;
    if (!student_id) {
        return res.status(400).json({ error: 'Student ID is required' });
    }
    try {
        const updatedStudent = await prisma.students.update({
            where: { student_id },
            data: {
                first_name,
                last_name,
                student_about,
                student_address,
                student_gender,
                student_github,
                student_linkedin,
                student_mobile,
                student_profile_picture,
                student_skills,
                student_twitter,
                student_university
            }
        });

        res.status(200).json(updatedStudent);
    } catch (err) {
        console.error('Error updating student profile:', err);
        res.status(500).json({ error: 'Failed to update profile', details: err });
    }
};

const uploadProfileImage = async (req: StudentRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        cloudinary.uploader.upload_stream({ folder: "profile_pictures" }, async (error, result) => {
            if (error) {
                return res.status(500).json({ error: "Cloudinary upload failed" });
            }
            const student_id = req.student?.student_id;
            const updatedStudent = await prisma.students.update({
                where: { student_id: student_id },
                data: { student_profile_picture: result?.secure_url },
            });
            return res.status(200).json({ imageUrl: result?.secure_url });
        }).end(req.file.buffer);
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export { registerStudent, loginStudent, getStudentProfile, logoutStudent, getMyLearning, checkPurchasedOrNot, editProfile, uploadProfileImage };

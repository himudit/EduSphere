import { PrismaClient } from "@prisma/client";
import { createTeacher } from "../services/teachers.service";
import AuthService from "../services/Authteachers.service";
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";
import cloudinary from "../cloudinaryConfig";

interface TeacherRequest extends Request {
    teacher?: {
        teacher_id: string;
    }
}

const prisma = new PrismaClient();

const registerTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("controllers");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { first_name, last_name, email, password } = req.body;
        const hashedPassword = await AuthService.hashPassword(password);
        const teacher_id = uuidv4();
        const teacher = await createTeacher({ teacher_id, first_name, last_name, email, password: hashedPassword });
        const teacher_token = AuthService.generateAuthToken(teacher);
        console.log(teacher_token);
        res.cookie('tacher_token', teacher_token);
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

// not used as of now
const logoutTeacher = async (req: any, res: Response, next: NextFunction) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged Out Successfully" })
}

const editProfile = async (req: TeacherRequest, res: Response) => {
    const {
        first_name,
        last_name,
        teacher_about,
        teacher_gender,
        teacher_profile_picture,
        teacher_skills,
    } = req.body;
    const teacher_id = req.teacher?.teacher_id;
    if (!teacher_id) {
        return res.status(400).json({ error: 'Teacher ID is required' });
    }
    try {
        const updatedTeacher = await prisma.teachers.update({
            where: { teacher_id },
            data: {
                first_name,
                last_name,
                teacher_about,
                teacher_gender,
                teacher_profile_picture,
                teacher_skills,
            }
        });

        res.status(200).json(updatedTeacher);
    } catch (err) {
        console.error('Error updating teacher profile:', err);
        res.status(500).json({ error: 'Failed to update profile', details: err });
    }
};

const uploadProfileImage = async (req: TeacherRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        cloudinary.uploader.upload_stream({ folder: "profile_pictures" }, async (error, result) => {
            if (error) {
                return res.status(500).json({ error: "Cloudinary upload failed" });
            }
            const teacher_id = req.teacher?.teacher_id;
            const updatedTeacher = await prisma.teachers.update({
                where: { teacher_id: teacher_id },
                data: { teacher_profile_picture: result?.secure_url },
            });
            return res.status(200).json({ imageUrl: result?.secure_url });
        }).end(req.file.buffer);
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const uploadCourse = async (req: TeacherRequest, res: Response) => {
    try {
        const teacher_id = req.teacher?.teacher_id;
        // Validate required fields
        if (!teacher_id) {
            return res.status(400).json({ error: 'Teacher ID is required' });
        }
        const {
            course_id,
            course_title,
            course_description,
            course_price,
            course_thumbnail = " ",
            course_no_of_purchase,
            course_total_no_hours,
            rating,
            creation,
            course_preview_video,
            course_what_you_will_learn,
            course_author,
            course_keywords,
            course_level
        } = req.body;
        const response = await prisma.courses.create({
            data: {
                course_id,
                course_title,
                course_description,
                course_price,
                course_thumbnail,
                course_no_of_purchase,
                course_total_no_hours,
                rating,
                creation,
                course_preview_video,
                course_what_you_will_learn,
                course_author,
                course_keywords,
                course_level
            }
        })
        const response2 = await prisma.teacher_courses.create({
            data: {
                teacher_id,
                course_id,
                creation
            }
        })
        return res.json(response);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error uploading Course Data:", err);
            res.status(500).json({ error: "Failed to upload data", details: err.message });
        } else {
            // Handle non-Error objects
            console.error("Unknown error:", err);
            res.status(500).json({ error: "Failed to upload data", details: "Unknown error" });
        }
    }
};

const uploadLecture = async (req: Request, res: Response) => {
    try {
        const {
            lecture_id,
            course_id,
            lecture_title,
            lecture_description,
            lecture_order,
            lecture_total_no_hours,
            creation
        } = req.body;
        const response = await prisma.lectures.create({
            data: {
                lecture_id,
                course_id,
                lecture_title,
                lecture_description,
                lecture_order,
                lecture_total_no_hours,
                creation,
            }
        })
        return res.json(response);

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error uploading Lecture Data:", err);
            res.status(500).json({ error: "Failed to upload data", details: err.message });
        } else {
            // Handle non-Error objects
            console.error("Unknown error:", err);
            res.status(500).json({ error: "Failed to upload data", details: "Unknown error" });
        }
    }
};

const uploadVideo = async (req: Request, res: Response) => {
    try {
        const {
            video_id,
            lecture_id,
            video_title,
            video_url,
            video_order,
            video_total_no_of_hours,
            creation
        } = req.body;
        const response = await prisma.videos.create({
            data: {
                video_id,
                lecture_id,
                video_title,
                video_url,
                video_order,
                video_total_no_of_hours,
                creation
            }
        })
        return res.json(response);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error uploading Video Data:", err);
            res.status(500).json({ error: "Failed to upload data", details: err.message });
        } else {
            // Handle non-Error objects
            console.error("Unknown error:", err);
            res.status(500).json({ error: "Failed to upload data", details: "Unknown error" });
        }
    }
};

export { registerTeacher, loginTeacher, getTeacherProfile, logoutTeacher, editProfile, uploadProfileImage, uploadCourse, uploadLecture, uploadVideo };

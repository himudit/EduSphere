import http from 'http';
import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/students.routes'
import teacherRoutes from './routes/teachers.routes'
import cookieParser from 'cookie-parser'
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { authStudent } from './middlewares/auth.middleware';

const app = express();

const prisma = new PrismaClient();

app.use(cookieParser());
app.use(cors({
    credentials: true,
}));
app.use(express.json());
app.use('/api', (req, res) => {
    res.send('Hello from server')
});

app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);

app.get('/rating', async (req: Request, res: Response) => {
    try {
        const courses = await prisma.courses.findMany();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
});

app.get('/course/:course_id', async (req: Request, res: Response) => {
    try {
        const course = await prisma.courses.findUnique({
            where: { course_id: req.params.course_id },
            include: {
                lectures: {
                    include: {
                        videos: true,
                    },
                },
            },
        })
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch course' });
    }
})


app.get('/search', async (req: Request, res: Response) => {
    try {
        const course = await prisma.courses.findMany()
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch course' });
    }
})

app.patch('/students/profile/edit', authStudent, async (req: Request, res: Response) => {
    // Destructure fields from the request body
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
    const student_id = req.student.student_id;
    // Validate required fields
    if (!student_id) {
        return res.status(400).json({ error: 'Student ID is required' });
    }
    try {
        // Update the student profile in the database
        const updatedStudent = await prisma.students.update({
            where: { student_id }, // Use the student_id to find the record
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

        // Return the updated student profile
        res.status(200).json(updatedStudent);
    } catch (err) {
        console.error('Error updating student profile:', err);
        // Generic error response
        res.status(500).json({ error: 'Failed to update profile', details: err });
    }
});

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


import http from 'http';
import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/students.routes'
import teacherRoutes from './routes/teachers.routes'
import cookieParser from 'cookie-parser'
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();

const prisma = new PrismaClient();

app.use(cookieParser());
app.use(cors());
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

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


import express from 'express'
import { registerTeacher, loginTeacher, getTeacherProfile, logoutTeacher } from '../controllers/teachers.controller'
const router = express.Router();
import { body } from 'express-validator';
import { Request, Response, NextFunction } from "express";
import { authTeacher } from '../middlewares/auth.middleware'

router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        body('first_name').isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long'),
    ],
    registerTeacher
);


router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    ],
    loginTeacher
);


router.get(
    '/profile', authTeacher, getTeacherProfile
)

router.get('/logout',
    logoutTeacher
)

export default router;
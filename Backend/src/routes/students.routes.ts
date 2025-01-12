import express from 'express'
import { registerStudent, loginStudent, getStudentProfile,logoutStudent } from '../controllers/students.controller'
const router = express.Router();
import { body } from 'express-validator';
import { Request, Response, NextFunction } from "express";
import { authStudent } from '../middlewares/auth.middleware'


router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        body('first_name').isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long'),
    ],
    registerStudent
);


router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    ],
    loginStudent
);


router.get(
    '/profile', authStudent, getStudentProfile
)

router.get('/logout',
    logoutStudent
)

export default router;
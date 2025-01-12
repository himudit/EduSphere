import express from 'express'
import { registerStudent } from '../controllers/students.controller'
const router = express.Router();
import { body } from 'express-validator';
import { Request, Response, NextFunction } from "express";


router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        body('first_name').isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long'),
    ],
    registerStudent
);



export default router;
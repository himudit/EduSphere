import express from 'express'
import { registerStudent, loginStudent, getStudentProfile, logoutStudent, getMyLearning, checkPurchasedOrNot, editProfile, uploadProfileImage } from '../controllers/students.controller'
const router = express.Router();
import { body } from 'express-validator';
import { Request, Response, NextFunction } from "express";
import { authStudent } from '../middlewares/auth.middleware'
import upload from '../multerConfig';
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

router.get('/mylearning', authStudent, getMyLearning);
router.post('/CheckPurchasedOrNot', authStudent, checkPurchasedOrNot);
router.patch('/profile/edit', authStudent, editProfile);
router.post("/profile/upload/image", authStudent, upload.single("image"), uploadProfileImage);

export default router;
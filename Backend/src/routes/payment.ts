import express from 'express'
const paymentRouter = express.Router();
import { body } from 'express-validator';
import { Request, Response, NextFunction } from "express";
import { authStudent } from '../middlewares/auth.middleware'
import razorpayinstance from '../services/razorpay'
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';

const prisma = new PrismaClient();

interface RazorpayOrderOptions {
    amount: number;        // Amount in paisa (1 INR = 100 paisa)
    currency: string;      // Currency type (e.g., "INR")
    receipt?: string;      // Optional receipt ID for tracking
    payment_capture?: number; // 1 = auto capture, 0 = manual capture
    notes?: {             // Additional metadata
        first_name?: string;
        last_name?: string;
        email?: string;
        course_id?: string;
    };
}

paymentRouter.post('/create/course/:course_id/teacher/:teacher_id', authStudent, async (req: any, res: Response, next: NextFunction) => {
    try {
        const student = req.student;
        // console.log(student);
        const options: RazorpayOrderOptions = {
            amount: 599443,
            currency: "INR",
            receipt: "receipt#1",
            notes: {
                first_name: student.first_name,
                last_name: student.last_name,
                email: student.email,
                course_id: req.params.course_id,
            },
        };
        const order = await razorpayinstance.orders.create(options);
        console.log(order);

        const newOrder = await prisma.payments.create({
            data: {
                student_id: student.student_id,
                teacher_id: req.params.teacher_id,
                course_id: req.params.course_id,
                amount: Number(order.amount),
                razorpay_order_id: order.id,
            },
        });
        // save it in Db
        // return back to frontend
        return res.status(201).json({ success: true, order: newOrder });

    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ msg: err.message });
        }
        return res.status(500).json({ msg: "An unknown error occurred" });
    }
})

paymentRouter.post('/payment/webhook', async (req: any, res: Response, next: NextFunction) => {
    try {
        const webhookSignature = req.get("X-Razorpay-Signature");
        console.log(webhookSignature)

        const isWebHookValid = validateWebhookSignature(JSON.stringify(req.body), webhookSignature, process.env.RAZORPAY_WEBHOOK_SECRET as string)

        if (!isWebHookValid) {
            return res.status(400).json({ msg: "Invalid Webhook Signature" });
        }
        const paymentDetails = req.body.payload?.payment?.entity
        console.log(paymentDetails);

        // update order in DB
        const updatedOrder = await prisma.payments.updateMany({
            where: { razorpay_order_id: paymentDetails.order_id },
            data: {
                payment_status: paymentDetails.status,
                razorpay_payment_id: paymentDetails.id,
            }
        });
        // add course in myplaylist according to student

        // if (req.body.event == "payment.captured") {

        // }
        // if (req.body.event == "payment.failed") {

        // }
        // return success response to razorpay 
        res.status(200).json({ msg: "webhook received successfully" })
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ msg: err.message });
        }
        return res.status(500).json({ msg: "An unknown error occurred" });
    }
})

export default paymentRouter;
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentRouter = express_1.default.Router();
const auth_middleware_1 = require("../middlewares/auth.middleware");
const razorpay_1 = __importDefault(require("../services/razorpay"));
const client_1 = require("@prisma/client");
const razorpay_utils_1 = require("razorpay/dist/utils/razorpay-utils");
const prisma = new client_1.PrismaClient();
paymentRouter.post('/create/course/:course_id/teacher/:teacher_id', auth_middleware_1.authStudent, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = req.student;
        const course = yield prisma.courses.findUnique({
            where: { course_id: req.params.course_id },
            include: {
                lectures: true,
            },
        });
        // console.log(student);
        const options = {
            amount: Number(course === null || course === void 0 ? void 0 : course.course_price) * 100,
            currency: "INR",
            receipt: "receipt#1",
            notes: {
                first_name: student.first_name,
                last_name: student.last_name,
                email: student.email,
                course_id: req.params.course_id,
                student_id: student.student_id,
            },
        };
        const order = yield razorpay_1.default.orders.create(options);
        // console.log(order);
        const newOrder = yield prisma.payments.create({
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
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ msg: err.message });
        }
        return res.status(500).json({ msg: "An unknown error occurred" });
    }
}));
paymentRouter.post('/webhook', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const webhookSignature = req.get("X-Razorpay-Signature");
        const isWebHookValid = (0, razorpay_utils_1.validateWebhookSignature)(JSON.stringify(req.body), webhookSignature, process.env.RAZORPAY_WEBHOOK_SECRET);
        if (!isWebHookValid) {
            return res.status(400).json({ msg: "Invalid Webhook Signature" });
        }
        const paymentDetails = (_b = (_a = req.body.payload) === null || _a === void 0 ? void 0 : _a.payment) === null || _b === void 0 ? void 0 : _b.entity;
        console.log(paymentDetails);
        // update order in DB
        const updatedOrder = yield prisma.payments.updateMany({
            where: { razorpay_order_id: paymentDetails.order_id },
            data: {
                payment_status: paymentDetails.status,
                razorpay_payment_id: paymentDetails.id,
            }
        });
        // add course in myplaylist according to student
        if (paymentDetails.status == "captured") {
            console.log(paymentDetails.order_id);
            console.log(paymentDetails.notes.student_id);
            console.log(paymentDetails.notes.course_id);
            const purchasedCourse = yield prisma.purchased_courses.create({
                data: {
                    order_id: paymentDetails.order_id,
                    student_id: paymentDetails.notes.student_id,
                    course_id: paymentDetails.notes.course_id,
                    progress: 0,
                    purchase_date: new Date()
                },
            });
            console.log("Purchased course added:", purchasedCourse);
        }
        // if (req.body.event == "payment.failed") {
        // }
        // return success response to razorpay 
        res.status(200).json({ msg: "webhook received successfully" });
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ msg: err.message });
        }
        return res.status(500).json({ msg: "An unknown error occurred" });
    }
}));
// paymentRouter.post('/webhook', async (req: any, res: Response, next: NextFunction) => {
//     try {
//     } catch (err) {
//         if (err instanceof Error) {
//             return res.status(500).json({ msg: err.message });
//         }
//         return res.status(500).json({ msg: "An unknown error occurred" });
//     }
// }
// )
exports.default = paymentRouter;

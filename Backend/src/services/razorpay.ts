// const Razorpay = require("razorpay");
// require("dotenv").config();

// const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// module.exports = instance;

import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export default instance;

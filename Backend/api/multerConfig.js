"use strict";
// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from './cloudinaryConfig';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'LMS-Images', // Folder in Cloudinary
//         allowed_formats: ['jpg', 'jpeg', 'png']
//     }
// });
// const upload = multer({ storage });
// export default upload;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage(); // Keeps files in memory
const upload = (0, multer_1.default)({ storage });
exports.default = upload;

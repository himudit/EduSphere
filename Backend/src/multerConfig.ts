// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from './cloudinaryConfig';

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'LMS-Images', // Folder in Cloudinary
//         allowed_formats: ['jpg', 'jpeg', 'png']
//     }
// });

// const upload = multer({ storage });

// export default upload;


import multer from "multer";

const storage = multer.memoryStorage(); // Keeps files in memory
const upload = multer({ storage });

export default upload;

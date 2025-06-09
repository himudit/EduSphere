# EduSphere - Online Course Management System

EduSphere is a full-stack web application built using the **PERN stack** (PostgreSQL, Express.js, ReactJS, and Node.js). It facilitates online course purchases, secure payments, authentication, and media storage to enhance the user experience.

## Live Demo

🔗 [EduSphere Live](https://edusphere-wine.vercel.app/)

## Key Features

- **Secure Payments with Razorpay** – Handles online transactions with seamless order tracking.
- **Course Enrollment System** – Automatically adds purchased courses to student profiles.
- **JWT Authentication** – Ensures secure login and access control for students and teachers.
- **Cloudinary Integration** – Efficiently manages and stores profile pictures and course media.
- **Database Management with Prisma** – Handles relational data for payments, enrollments, and user roles.

## Tech Stack Used

### Frontend

- ReactJS (TypeScript)

### Backend

- Node.js, Express.js, Prisma

### Database

- PostgreSQL 

### Payment Integration

- Razorpay

### Hosting

- Vercel (Frontend)
- Render (Backend)
- NeonDB (Database)

## Installation & Setup

### 1. Clone the repository:
   ```bash
   git clone https://github.com/himudit/EduSphere.git
   ```

### 2. Install dependencies for both frontend and backend:
   ```bash
   cd backend
   npm install
   
   cd ./frontend/edusphere
   npm install
   ```

### 3. Configure environment variables:
   Create a `.env` file in the `backend` directory with the following details:
   ```ini
   PORT=4000
   DATABASE_URL=<DATABASE_URL>
   
   JWT_SECRET=<your_jwt_secret>
   
   CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
   CLOUDINARY_API_KEY=<your_cloudinary_api_key>
   CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
   
   RAZORPAY_KEY_ID=<your_razorpay_key_id>
   RAZORPAY_KEY_SECRET=<your_razorpay_key_secret>
   RAZORPAY_WEBHOOK_SECRET=<your_razorpay_webhook_secret>
   ```
   These variables are essential for authentication, cloud storage, and payment processing.

### 4. Apply database migrations:
   Run the following command to apply Prisma migrations and set up the database schema:
   ```bash
   cd backend
   npx prisma migrate dev --name init
   ```

### 5. Run the development server:
   Open two terminals and execute the following commands:

   **Terminal 1: Start TypeScript Compiler in Watch Mode**
   ```bash
   cd backend
   tsc --watch
   ```

   **Terminal 2: Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```

   **Terminal 3: Start Frontend**
   ```bash
   cd ./frontend/edusphere
   npm run dev
   ```

6. Open the app in your browser at `http://localhost:3000`.

## Contributing

Contributions are welcome! Feel free to fork the project and submit pull requests.

---

🚀 **EduSphere** – Empowering Education with Seamless Course Management


import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/students.routes'
import teacherRoutes from './routes/teachers.routes'
import coursesRoutes from './routes/courses.routes'
import paymentRoutes from './routes/payment'
import cookieParser from 'cookie-parser'
import compression from 'compression';

const app = express();


app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use(compression());
app.use(express.json());

app.use("/api", (req, res) => {
    res.send("Hello from server");
});


app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
})

app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/payment", paymentRoutes);
app.use("/", coursesRoutes);

export default app;

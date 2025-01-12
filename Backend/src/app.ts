import express from 'express';
import cors from 'cors';
// import router from './routes/students.routes.ts'
import studentRoutes from './routes/students.routes'


const app = express();

app.use(cors());
app.use(express.json());
app.use('/students', studentRoutes);

export { app };
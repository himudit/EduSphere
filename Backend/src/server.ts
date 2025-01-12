import http from 'http';
import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/students.routes'

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', (req, res) => {
    res.send('Hello from server')
});
app.use('/students', studentRoutes);


const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


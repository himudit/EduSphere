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
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const students_routes_1 = __importDefault(require("./routes/students.routes"));
const teachers_routes_1 = __importDefault(require("./routes/teachers.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', (req, res) => {
    res.send('Hello from server');
});
app.use('/students', students_routes_1.default);
app.use('/teachers', teachers_routes_1.default);
app.get('/rating', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield prisma.courses.findMany();
        res.status(200).json(courses);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
}));
const port = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

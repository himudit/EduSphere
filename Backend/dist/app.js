"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const students_routes_1 = __importDefault(require("./routes/students.routes"));
const teachers_routes_1 = __importDefault(require("./routes/teachers.routes"));
const courses_routes_1 = __importDefault(require("./routes/courses.routes"));
const payment_1 = __importDefault(require("./routes/payment"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ credentials: true }));
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use("/api", (req, res) => {
    res.send("Hello from server");
});
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.use("/students", students_routes_1.default);
app.use("/teachers", teachers_routes_1.default);
app.use("/payment", payment_1.default);
app.use("/", courses_routes_1.default);
exports.default = app;

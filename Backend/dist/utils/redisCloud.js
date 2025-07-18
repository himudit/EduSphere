"use strict";
// utils/redisCloud.ts
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
exports.redisCloud = void 0;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
    throw new Error('REDIS_URL is not defined in .env');
}
exports.redisCloud = (0, redis_1.createClient)({
    url: redisUrl,
});
exports.redisCloud.on('error', (err) => console.error('Redis Cloud Client Error:', err));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.redisCloud.connect();
        console.log('✅ Connected to Redis Cloud');
    }
    catch (err) {
        console.error('❌ Redis Cloud connection failed:', err);
    }
}))();

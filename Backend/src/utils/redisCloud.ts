// utils/redisCloud.ts

import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
    throw new Error('REDIS_URL is not defined in .env');
}

export const redisCloud = createClient({
    url: redisUrl,
});

redisCloud.on('error', (err) => console.error('Redis Cloud Client Error:', err));

(async () => {
    try {
        await redisCloud.connect();
        console.log('✅ Connected to Redis Cloud');
    } catch (err) {
        console.error('❌ Redis Cloud connection failed:', err);
    }
})();

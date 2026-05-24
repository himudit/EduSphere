"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterSearchCourses = exports.searchCourses = exports.getAllCoursesV2 = exports.getAllCoursesV1 = exports.getCourseById = exports.getTopRatedCoursesV3 = exports.getTopRatedCourses = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTopRatedCourses = async (req, res) => {
    try {
        const courses = await prisma.courses.findMany({
            orderBy: {
                rating: 'desc',
            },
            take: 3,
        });
        res.status(200).json(courses);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
};
exports.getTopRatedCourses = getTopRatedCourses;
const getTopRatedCoursesV3 = async (req, res) => {
    try {
        const cacheKey = 'courses_rating_all_v3';
        // Check Redis Cloud cache
        // const cachedCourses = await redisCloud.get(cacheKey);
        // if (cachedCourses) {
        //     console.log('✅ Cache hit (Redis Cloud)');
        //     return res.status(200).json(JSON.parse(cachedCourses));
        // }
        // Query from DB if not in cache
        const courses = await prisma.courses.findMany({
            orderBy: {
                rating: 'desc',
            },
            take: 3,
        });
        // Save result to Redis Cloud with TTL of 1 hour
        // await redisCloud.set(cacheKey, JSON.stringify(courses), { EX: 3600 });
        return res.status(200).json(courses);
    }
    catch (error) {
        console.error('❌ Error in /v3/rating:', error);
        return res.status(500).json({ error: 'Failed to fetch courses' });
    }
};
exports.getTopRatedCoursesV3 = getTopRatedCoursesV3;
const getCourseById = async (req, res) => {
    try {
        const course = await prisma.courses.findUnique({
            where: { course_id: req.params.course_id },
            include: {
                lectures: {
                    include: {
                        videos: true,
                    },
                },
            },
        });
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        const teacherCourse = await prisma.teacher_courses.findFirst({
            where: { course_id: req.params.course_id },
            include: { teacher: true }
        });
        if (teacherCourse) {
            res.status(200).json({
                course,
                teacherCourse
            });
        }
        else {
            res.status(200).json(course);
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch course' });
    }
};
exports.getCourseById = getCourseById;
const getAllCoursesV1 = async (req, res) => {
    try {
        const allCourses = await prisma.courses.findMany();
        return res.status(200).json(allCourses);
    }
    catch (err) {
        console.error('Error fetching courses:', err);
        return res.status(500).json({ error: 'Failed to fetch courses' });
    }
};
exports.getAllCoursesV1 = getAllCoursesV1;
const getAllCoursesV2 = async (req, res) => {
    try {
        const cacheKey = 'all_courses';
        // Check cache
        // const cachedCourses = await redisCloud.get(cacheKey);
        // if (cachedCourses) {
        //     return res.status(200).json(JSON.parse(cachedCourses));
        // }
        // Cache miss: fetch from DB
        const allCourses = await prisma.courses.findMany();
        // Store in cache with 1-hour TTL
        // await redisCloud.set(cacheKey, JSON.stringify(allCourses), { EX: 3600 });
        console.log('💾 Cache set for /search');
        return res.status(200).json(allCourses);
    }
    catch (err) {
        console.error('❌ Error fetching courses:', err);
        return res.status(500).json({ error: 'Failed to fetch courses' });
    }
};
exports.getAllCoursesV2 = getAllCoursesV2;
const searchCourses = async (req, res) => {
    try {
        const query = (req.query.q || req.query.query);
        if (!query || typeof query !== 'string') {
            return res.status(400).json({ error: 'Search query is required' });
        }
        const searchTerm = query.toLowerCase();
        const allCourses = await prisma.courses.findMany();
        const filteredCourses = allCourses.filter(course => {
            const matchesTitle = course.course_title && course.course_title.toLowerCase().includes(searchTerm);
            const matchesKeyword = course.course_keywords && course.course_keywords.some(keyword => keyword.toLowerCase().includes(searchTerm));
            return matchesTitle || matchesKeyword;
        });
        res.status(200).json(filteredCourses);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to search courses' });
    }
};
exports.searchCourses = searchCourses;
const filterSearchCourses = async (req, res) => {
    try {
        const { topic, level, rating } = req.query;
        let filter = {};
        let minRating;
        const ratingStr = typeof rating === "string" ? rating : undefined;
        if (ratingStr) {
            if (ratingStr.includes("& up")) {
                minRating = parseFloat(ratingStr.split(" & up")[0]);
            }
            else if (ratingStr.includes("& below")) {
                minRating = parseFloat(ratingStr.split(" & below")[0]);
            }
        }
        let topicsArray = [];
        if (typeof topic === "string") {
            topicsArray = [topic];
        }
        else if (Array.isArray(topic)) {
            topicsArray = topic.map(t => String(t));
        }
        const levelStr = typeof level === "string" ? level : undefined;
        const courses = await prisma.courses.findMany({
            where: {
                AND: [
                    levelStr ? { course_level: levelStr } : {},
                    topicsArray.length > 0 ? { course_keywords: { hasSome: topicsArray } } : {},
                    minRating !== undefined
                        ? ratingStr?.includes("below")
                            ? { rating: { lte: minRating } }
                            : { rating: { gte: minRating } }
                        : {}
                ]
            },
        });
        if (!courses.length) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(courses);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
};
exports.filterSearchCourses = filterSearchCourses;

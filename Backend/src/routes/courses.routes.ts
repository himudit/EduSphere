import express from 'express';
import {
    getTopRatedCourses,
    getTopRatedCoursesV3,
    getCourseById,
    getAllCoursesV1,
    getAllCoursesV2,
    searchCourses,
    filterSearchCourses
} from '../controllers/courses.controller';

const router = express.Router();

router.get('/rating', getTopRatedCourses);
router.get('/v3/rating', getTopRatedCoursesV3);
router.get('/course/:course_id', getCourseById);
router.get('/v1/search', getAllCoursesV1);
router.get('/v2/search', getAllCoursesV2);
router.get('/search', searchCourses);
router.get('/filterSearch', filterSearchCourses);

export default router;

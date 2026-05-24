"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courses_controller_1 = require("../controllers/courses.controller");
const router = express_1.default.Router();
router.get('/rating', courses_controller_1.getTopRatedCourses);
router.get('/v3/rating', courses_controller_1.getTopRatedCoursesV3);
router.get('/course/:course_id', courses_controller_1.getCourseById);
router.get('/v1/search', courses_controller_1.getAllCoursesV1);
router.get('/v2/search', courses_controller_1.getAllCoursesV2);
router.get('/search', courses_controller_1.searchCourses);
router.get('/filterSearch', courses_controller_1.filterSearchCourses);
exports.default = router;

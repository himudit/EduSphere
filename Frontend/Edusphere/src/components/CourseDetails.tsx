import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface CourseData {
    course: Course; // The course data
    lectures: Lecture[]; // Array of all lectures
}

interface Course {
    course_id: string;
    course_title: string;
    course_description: string;
    course_price: number;
    course_thumbnail: string;
    course_no_of_purchase: number;
    course_total_no_hours: number;
    rating: number;
    creation: string;
    course_author: string;
    course_what_you_will_learn: string[];
    course_keywords: string[];
    course_preview_video: string;
    lectures: Lecture[];
}

interface Lecture {
    lecture_id: string;
    lecture_title: string;
    lecture_description: string;
    lecture_order: number;
    lecture_total_no_hours: number;
    videos: Video[];
}

interface Video {
    video_id: string;
    video_title: string;
    lecture_order: number;
    video_total_no_of_hours: number;
    video_url: string;
}

const CourseDetails = () => {
    const [expandedSection, setExpandedSection] = useState<string | null>('01');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [courseData, setCourseData] = useState<CourseData | undefined>(undefined);
    const { course_id } = useParams<{ course_id: string }>();
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/course/${course_id}`);
                const data: CourseData = response.data;
                setCourseData(data);
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCourses();
    }, [course_id]);

    const toggleSection = (sectionId: string) => {
        setExpandedSection(expandedSection === sectionId ? null : sectionId);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen">
            {/* Main Content */}
            <div className="w-full lg:w-[65%] bg-black p-4 overflow-y-auto">


                {/* Video Preview */}
                <div className="relative aspect-video bg-gray-100 rounded-lg mb-8 overflow-hidden">
                    <video
                        // src={courseData?.course_preview_video} // Replace with your video URL
                        src="https://res.cloudinary.com/dy8jwwm6j/video/upload/v1739098886/courseVideos/eqejzrvhbgho2vezjj1m.mp4"
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        controls
                    ></video>
                    {/* <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-opacity">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-purple-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </button> */}
                </div>

                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-3xl font-bold mb-4 text-white font-sans tracking-tight">
                        {courseData?.course_title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">{courseData?.lectures.length}</span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">{courseData?.course_total_no_hours}</span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="font-medium">{courseData?.rating}</span>
                        </div>
                    </div>
                </div>

                {/* Course Content */}
                <div className="mb-8">
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">About Course</h2>
                        <p className="text-white text-sm">
                            {courseData?.course_description}
                        </p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {courseData?.course_what_you_will_learn.map((point, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-600">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Hamburger Button */}
            <button
                onClick={toggleSidebar}
                className="fixed right-4 top-4 lg:hidden z-50 bg-purple-600 text-white p-2 rounded-lg shadow-lg"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                </svg>
            </button>


            {/* Course Content Sidebar */}
            <div
                className={`fixed lg:static lg:block w-full lg:w-[35%] h-full bg-black overflow-y-auto transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
                    } top-0 right-0 z-40`}
            >
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Course content</h2>
                    <div className="space-y-2">
                        {courseData?.lectures?.map((lecture) => (
                            // <div key={lecture.lecture_id} className="  border-pink-200 border rounded-lg bg-red-400 overflow-hidden">
                            // <div key={lecture.lecture_id} className=" rounded-lg bg-gradient-to-r from-purple-900 to-purple-700 D overflow-hidden">
                            <div key={lecture.lecture_id} className="rounded-lg bg-gradient-to-r from-purple-700 to-purple-400 D overflow-hidden">

                                <button
                                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-purple-500"
                                    onClick={() => toggleSection(lecture.lecture_id)}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">{lecture.lecture_id}. {lecture.lecture_title}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-white">{lecture.lecture_total_no_hours}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-5 w-5 transition-transform ${expandedSection === lecture.lecture_id ? 'transform rotate-180' : ''
                                                }`}
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </button>
                                {expandedSection === lecture.lecture_id && lecture.videos && (
                                    <div className="border-t">
                                        {lecture.videos.map((video, index) => (
                                            <div
                                                key={index}
                                                className="px-4 py-2 flex items-center justify-between hover:bg-purple-400 cursor-pointer"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-sm text-white">{video.video_title}</span>
                                                </div>
                                                <span className="text-sm text-black-500">
                                                    {video.video_total_no_of_hours}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                    </div>

                    {/* Author Section */}
                    <div className="mt-8 border-t pt-6">
                        <h2 className="text-lg font-semibold mb-4">Publisher</h2>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex items-start gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1"
                                    alt="Ryan Curtis"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-medium text-gray-900">Ryan Curtis</h3>
                                        <span className="text-sm text-gray-500">3D Artist</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Hey! My name is Ryan. I'm 26 and I'm a freelance 3D Artist with around 5 years of experience.
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="text-sm text-gray-600">4.8 Instructor rating</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                            </svg>
                                            <span className="text-sm text-gray-600">889 Reviews</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                            </svg>
                                            <span className="text-sm text-gray-600">4,887 Students</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm text-gray-600">6 Courses</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import image from '../assets/pic1-removebg-preview.png'
import { useEffect, useState } from 'react';
import Card from "./Card";
import axios from 'axios';
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface Course {
    course_id: string;
    course_title: string;
    course_description: string;
    course_price: number;
    course_author: string;
    course_thumbnail: string;
    course_total_no_hours: string;
    rating: number;
}

interface PurchasedCourse {
    order_id: string;
    student_id: string;
    course_id: string;
    purchase_date: string;
    progress: number;
    course: Course;
}

const MyLearning = () => {
    const [courses, setCourses] = useState<PurchasedCourse[]>([]);
    const [loading1, setLoading] = useState(true);
    const { user, loading, error } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get<{ purchasedCourses: PurchasedCourse[] }>(
                    `${import.meta.env.VITE_BASE_URL}/students/mylearning`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (response.data && response.data.purchasedCourses) {
                    setCourses(response.data.purchasedCourses);
                }
            } catch (err) {
                console.error('Error fetching courses:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="p-6 w-full lg:w-[80%] mx-auto">

            {/* Welcome Section */}
            <div className="text-2xl font-semibold mb-2 ml-4">
                Welcome back, <span className="text-purple-600">{user.first_name}</span> 👋
            </div>

            {/* Banner */}
            <div className="bg-black text-white rounded-xl p-6 flex items-center justify-between mb-8">
                <div>
                    <div className="text-xl font-bold mt-1 mb-1">
                        Develop Professional Skills Through Online Training
                    </div>
                    <div className="text-md text-gray-300">
                        Consistency is the key — keep learning, keep growing. Your future self will thank you.
                    </div>
                </div>

                <img
                    src={image}
                    alt="Banner"
                    className="w-[200px] h-[150px] object-cover"
                />
            </div>

            {/* Course Cards */}
            {/* {
                courses.length === 0 ?
                    <>
                        <div className="flex justify-center items-center">
                            <div className="flex flex-col items-center gap-4 text-gray-600 text-xl">
                                <FontAwesomeIcon icon={faGraduationCap} className="text-[10rem] text-gray-400" />
                                <div className="text-white">No course found</div>
                                <div className="text-sm text-gray-500">Browse our courses and begin your learning adventure!</div>
                            </div>
                        </div>
                    </>
                    :
                    <div className="flex flex-wrap gap-4">
                        <div className="flex flex-wrap gap-6 justify-center">
                            {Arr.map((card, index) => (
                                <div key={index}>
                                    {card}
                                </div>
                            ))}
                        </div>
                    </div>
                } */}
            {loading1 ? (

                <div className="flex flex-wrap gap-4">{
                    Array(3).fill(null).map((_, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)] w-[280px] h-[300px]"
                        >
                            {/* Image Placeholder */}
                            <div className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 h-36 w-full rounded-xl mb-4 animate-pulse"></div>

                            {/* Text Line Placeholders */}
                            <div className="h-4 bg-gray-600 rounded-lg w-3/4 mb-2 animate-pulse"></div>
                            <div className="h-3 bg-gray-500 rounded-lg w-1/2 mb-2 animate-pulse"></div>
                            <div className="h-3 bg-gray-600 rounded-lg w-full mb-4 animate-pulse"></div>

                            {/* Icon Row Placeholder */}
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-4 w-4 bg-gray-500 rounded-full animate-pulse"></div>
                                <div className="h-4 w-10 bg-gray-500 rounded animate-pulse"></div>
                                <div className="h-4 w-8 bg-gray-500 rounded ml-auto animate-pulse"></div>
                            </div>

                            {/* Bottom Button Placeholder */}
                            <div className="h-5 bg-gradient-to-r from-gray-600 to-gray-500 rounded-lg w-16 mt-auto animate-pulse"></div>
                        </div>
                    ))}
                </div>
            ) : courses.length === 0 ? (
                <div className="flex justify-center items-center">
                    <div className="flex flex-col items-center gap-4 text-gray-600 text-xl">
                        <FontAwesomeIcon icon={faGraduationCap} className="text-[10rem] text-gray-400" />
                        <div className="text-white">No course found</div>
                        <div className="text-sm text-gray-500">Browse our courses and begin your learning adventure!</div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-wrap gap-4">
                    <div className="flex flex-wrap gap-6 justify-center">
                        {Arr.map((card, index) => (
                            <div key={index}>
                                {card}
                            </div>
                        ))}
                    </div>
                </div>
            )}



        </div >
    );
};

export default MyLearning;

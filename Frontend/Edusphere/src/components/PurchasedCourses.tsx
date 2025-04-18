import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUser } from "@fortawesome/free-solid-svg-icons";
import image from '../assets/pic1-removebg-preview.png'
import { useEffect, useState } from 'react';
import Card from "./Card";
import axios from 'axios';

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // console.log("hi");
                const token = localStorage.getItem("token");

                const response = await axios.get<{ purchasedCourses: PurchasedCourse[] }>(
                    `${import.meta.env.VITE_BASE_URL}/students/mylearning`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log(response.data);
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

    // const Arr: JSX.Element[] = courses.map((purchase, index) => (
    //     <Card
    //         id={purchase.course.course_id}
    //         key={index}
    //         thumbnail={purchase.course.course_thumbnail}
    //         title={purchase.course.course_title}
    //         author={purchase.course.course_author}
    //         description={purchase.course.course_description}
    //         rating={purchase.course.rating}
    //         reviews={146}
    //         price={purchase.course.course_price}
    //     />
    // ))

    const Arr: JSX.Element[] = loading
        ? Array(3).fill(null).map((_, index) => (
            <div
                key={index}
                className="bg-gray-900 rounded-2xl p-4 shadow-md w-[280px] h-[300px] animate-pulse">
                <div className="bg-gray-700 h-36 w-full rounded-lg mb-4"></div>

                <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-600 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-full mb-4"></div>

                <div className="flex items-center gap-2 mb-2">
                    <div className="h-4 w-4 bg-gray-600 rounded-full"></div>
                    <div className="h-4 w-10 bg-gray-600 rounded"></div>
                    <div className="h-4 w-8 bg-gray-600 rounded ml-auto"></div>
                </div>

                <div className="h-5 bg-gray-500 rounded w-16 mt-auto"></div>
            </div>
        ))
        : courses.map((purchase, index) => (
            <Card
                id={purchase.course.course_id}
                key={index}
                thumbnail={purchase.course.course_thumbnail}
                title={purchase.course.course_title}
                author={purchase.course.course_author}
                description={purchase.course.course_description}
                rating={purchase.course.rating}
                reviews={146}
                price={purchase.course.course_price}
            />
        ));


    return (
        <div className="p-6 w-full lg:w-[80%] mx-auto">

            {/* Welcome Section */}
            <div className="text-2xl font-semibold mb-2">
                Welcome back, <span className="text-purple-600">Naveed Abbas</span> 👋
            </div>

            {/* Banner */}
            <div className="bg-black text-white rounded-xl p-6 flex items-center justify-between mb-8">
                <div>
                    <div className="text-sm uppercase text-gray-400">Online Courses</div>
                    <div className="text-xl font-bold mt-1 mb-4">
                        Develop Professional Skills Through Online Training
                    </div>
                    <button className="bg-white text-black px-4 py-2 rounded-md font-semibold flex items-center gap-2">
                        Explore <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
                <img
                    src={image} // Replace with your banner image path
                    alt="Banner"
                    className="w-[200px] h-[150px] object-cover"
                />
            </div>

            {/* Course Cards */}
            <div className="flex flex-wrap gap-4">
                <div className="flex flex-wrap gap-6 justify-center">
                    {Arr.map((card, index) => (
                        <div key={index}>
                            {card}
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default MyLearning;

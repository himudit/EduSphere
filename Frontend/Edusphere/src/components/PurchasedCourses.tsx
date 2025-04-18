import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUser } from "@fortawesome/free-solid-svg-icons";
import image from '../assets/pic1-removebg-preview.png'
import { useEffect, useState } from 'react';
import Card from "./Card";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { fetchUserProfile, addUser, removeUser } from "../features/userSlice";

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

    const Arr: JSX.Element[] = loading1
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

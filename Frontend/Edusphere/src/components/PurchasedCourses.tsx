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

const PurchasedCourses: React.FC = () => {

    const [courses, setCourses] = useState<PurchasedCourse[]>([]);

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
            }
        };
        fetchCourses();
    }, []);

    const Arr: JSX.Element[] = courses.map((purchase, index) => (
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
    ))

    return (
        <>
            <div className="absolute w-full h-full flex justify-center items-center">
                {Arr.map((card, index) => (
                    <div
                        key={index}
                    >
                        {card}
                    </div>
                ))}
                {/* {courses?.purchasedCourses?.map((purchase, index) => (
                    <div key={index}>
                        <h2>{purchase.course.course_title}</h2>
                        <img src={purchase.course.course_thumbnail} alt="Course Thumbnail" width={200} />
                        <p>{purchase.course.course_description}</p>
                        <p><strong>Price:</strong> {purchase.course.course_price} INR</p>
                        <p><strong>Rating:</strong> {purchase.course.rating} ⭐</p>
                    </div>
                ))} */}
            </div>
        </>
    )
}


export default PurchasedCourses;
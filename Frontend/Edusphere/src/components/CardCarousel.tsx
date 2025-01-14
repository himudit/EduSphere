import { useState, useEffect } from 'react';
import Card from "./Card";
import axios from 'axios';

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
}

const CardCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === courses.length - 1 ? 0 : prevIndex + 1
            );
        }, 2000);

        return () => clearInterval(interval);
    }, [courses.length]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get<Course[]>(`${import.meta.env.VITE_BASE_URL}/rating`);
                setCourses(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCourses();
    }, []);

    const Arr: JSX.Element[] = courses.map((it, index) => (
        <Card
            id={it.course_id}
            key={index}
            thumbnail={it.course_thumbnail}
            title={it.course_title}
            author={it.course_author}
            description={it.course_description}
            rating={it.rating}
            reviews={146}
            price={it.course_price}
        />
    ));

    const getPosition = (index: number) => {
        if (index === currentIndex) return 'center';
        if (index === currentIndex - 1 || (currentIndex === 0 && index === courses.length - 1)) return 'left';
        if (index === currentIndex + 1 || (currentIndex === courses.length - 1 && index === 0)) return 'right';
        return 'hidden';
    };

    const getImageStyles = (position: string): string => {
        const isMobile = window.innerWidth <= 768;

        switch (position) {
            case 'center':
                return `translate-x-0 scale-100 opacity-100 z-30`;
            case 'left':
                return isMobile
                    ? '-translate-x-[20%] scale-90 opacity-70 z-20'
                    : '-translate-x-[50%] scale-90 opacity-70 z-20';
            case 'right':
                return isMobile
                    ? 'translate-x-[20%] scale-90 opacity-70 z-20'
                    : 'translate-x-[50%] scale-90 opacity-70 z-20';
            default:
                return 'opacity-0 scale-75 z-10';
        }
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
            {/* Carousel Container */}
            <div className="relative h-[28rem] overflow-visible">
                <div className="absolute w-full h-full flex justify-center items-center">
                    {Arr.map((card, index) => (
                        <div
                            key={index}
                            className={`absolute transition-all duration-500 ease-in-out ${getImageStyles(
                                getPosition(index)
                            )}`}
                        >
                            {card}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {Arr.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-3 transition-all duration-300 rounded-full ${currentIndex === index
                            ? 'w-8 bg-purple-600'
                            : 'w-3 bg-gray-400 hover:bg-purple-400'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardCarousel;
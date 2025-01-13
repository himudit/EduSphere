import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import FoodCarousel from "./FoodCarousel";
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

const Home: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>(`${import.meta.env.VITE_BASE_URL}/rating`);
        // console.log(response);
        setCourses(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourses();

  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen text-white px-6">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-7xl md:text-6xl  mb-4 text-center"
        >
          Welcome to
        </motion.h1>

        {/* Highlighted Gradient Text */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-7xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-purple-500 to-indigo-600"
        >
          EduSphere
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="text-lg md:text-2xl font-medium mt-6 text-center"
        >
          When Learning Meets Progress
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="text-sm md:text-base text-gray-400 max-w-2xl text-center"
        >
          Access the Latest Online Learning System and Materials to Fuel Your knowledge Growth.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.6 }}
          className="mt-8"
        >
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:opacity-90 text-lg transition-all">
            Get Started
          </button>
        </motion.div>
      </div>
      {/* <FoodCarousel /> */}
      <div className="flex justify-center items-center min-h-screen  flex-wrap p-4 gap-8">
        {
          courses.map((it, index) => {
            return <Card
              key={index}
              thumbnail={it.course_thumbnail}
              title={it.course_title}
              author={it.course_author}
              description={it.course_description}
              rating={it.rating}
              reviews={146}
              price={it.course_price}
            />
          })
        }

      </div>
    </>
  );
};

export default Home;

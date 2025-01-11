import React from "react";
import { motion } from "framer-motion";
import FoodCarousel from "./FoodCarousel";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css'; // Import Swiper styles
// import 'swiper/swiper-bundle.css'; // The newer version of the Swiper library uses this path


const Home: React.FC = () => {
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
      <FoodCarousel />
    </>
  );
};

export default Home;

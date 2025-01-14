import React from "react";
import { motion } from "framer-motion";
import CardCarousel from "./CardCarousel";

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

      {/* _____________________ */}
      <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen p-4 gap-8 lg:gap-4">
        {/* Left Content */}
        <div className="w-full lg:w-1/3 lg:pr-8 relative ml-[5rem]">
          <div className="hidden lg:block absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-purple-600 via-pink-500 to-transparent"></div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent text-center lg:text-left">
            Discover Excellence in Learning
          </h1>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400 flex-shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
              <p className="text-base lg:text-lg">Top-rated courses by industry experts</p>
            </div>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 lg:w-6 lg:h-6 text-purple-400 flex-shrink-0">
                <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
              </svg>
              <p className="text-base lg:text-lg">Learn from real-world projects</p>
            </div>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 lg:w-6 lg:h-6 text-pink-400 flex-shrink-0">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
              </svg>
              <p className="text-base lg:text-lg">Start learning at your own pace</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/3 ml-[2rem]">
          <CardCarousel />
        </div>
      </div>

    </>
  );
};

export default Home;

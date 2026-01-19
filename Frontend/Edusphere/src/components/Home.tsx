import React from "react";
import { motion } from "framer-motion";
import CardCarousel from "./CardCarousel";
import MiddleSection from './AnimatedText ';
import { SlidingGallery } from './SlidingGallery';
import AchievementSection from "./AcheivementSection";
import OurServices from "./OurServices";
import Footer from "./Footer";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-full relative bg-black">
      {/* Dark White Dotted Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#000000",
          backgroundImage: `
            radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0",
        }}
      />

      {/* Your Content/Components */}
      <div className="relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen text-white px-6 overflow-hidden">
          {/* Main Heading */}

          <h1
            className="text-5xl md:text-7xl mb-2 text-center min-h-[70px] max-w-5xl mx-auto"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            Welcome to
          </h1>


          {/* Highlighted Gradient Text */}
          {/* <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-6xl text-center leading-snug max-w-5xl mx-auto"
            style={{ fontFamily: '"Instrument Serif", serif', color: '#895bf5', fontSize: 'clamp(5rem, 12vw, 10rem)' }}
          >
            EduSphere
          </motion.h1> */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-center leading-snug max-w-5xl mx-auto"
            style={{
              fontFamily: '"Instrument Serif", serif',
              color: '#895bf5',
              fontSize: 'clamp(8rem, 6vw, 10rem)',
            }}
          >
            EduSphere
          </motion.h1>

          {/* Subheading */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2 }}
            className="text-lg md:text-2xl font-medium mt-6 text-center"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            {/* When Learning Meets Progress */}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-4xl text-center"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            Access the Latest Online Learning System and Materials to Fuel Your knowledge Growth.
          </motion.p>
        </div>

        {/* _____________________ */}
        <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen p-4 gap-8 lg:gap-4  -mt-[7rem]">
          {/* Left Content */}
          <div className="w-full lg:w-1/3 lg:pr-8 relative ml-[2rem]">
            <div className="hidden lg:block absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-purple-600 via-pink-500 to-transparent"></div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent text-center lg:text-left">
              Discover Excellence in Learning
            </h1>
            <div
              className="space-y-4 text-gray-300"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-[#895bf5] text-white flex items-center justify-center flex-shrink-0 text-sm lg:text-base">
                  1
                </div>
                <p className="text-base lg:text-lg">Top-rated courses by industry experts</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-[#895bf5] text-white flex items-center justify-center flex-shrink-0 text-sm lg:text-base">
                  2
                </div>
                <p className="text-base lg:text-lg">Learn from real-world projects</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-[#895bf5] text-white flex items-center justify-center flex-shrink-0 text-sm lg:text-base">
                  3
                </div>
                <p className="text-base lg:text-lg">Start learning at your own pace</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/3 ">
            <CardCarousel />
          </div>
        </div>
        <MiddleSection />

        <div className="-mt-[10rem] flex justify-center items-center ">
          <SlidingGallery />
        </div>

        <div className="w-full mt-[5rem]">
          <OurServices />
          <AchievementSection />
        </div>

        <div className="mt-[5rem]">
          <Footer />

        </div>
      </div>
    </div>
  );
};

export default Home;

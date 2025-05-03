import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';


const StatCard = ({
    value,
    label
}: {
    value: string;
    label: string;
}) => {
    const { ref, inView } = useInView({ triggerOnce: true });
    const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
    const suffix = value.replace(/[0-9.]/g, '');
    return (
        <div ref={ref} className="flex flex-col items-center">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {inView ? (
                    <CountUp end={numericValue} duration={2} suffix={suffix} />
                ) : (
                    '0' + suffix
                )}
            </h3>
            <p className="text-sm md:text-base text-gray-300 mt-2">{label}</p>
        </div>
    );
};

const AchievementSection = () => {
    return (
        <div className="w-full  py-10 md:py-16 px-6 md:px-10 rounded-md">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Why Choose Us Card */}
                    <div className="bg-[#22153A] rounded-3xl p-6 md:p-8 flex flex-col items-start">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-6">Why Choose Us?</h2>
                        <p className="text-sm md:text-base text-gray-300 mb-6">
                            We are committed to providing high-quality content and seamless learning experiences to students across the globe. Our platform brings together innovation, accessibility, and expert guidance.
                        </p>
                        <button className="flex items-center text-gray-300 hover:text-white transition-colors">
                            {/* <span className="mr-2">Learn More</span> */}
                            {/* <ArrowRight size={18} /> */}
                        </button>
                    </div>

                    {/* Achievements Column */}
                    <div className="lg:col-span-2">
                        {/* Achievement Banner */}
                        <div className="bg-gradient-to-r from-[#6A5B8F] to-[#9385a7] rounded-3xl p-4 md:p-6 mb-8 flex items-center">
                            <div className="bg-white p-2 rounded-full mr-4">
                                <div className="bg-[#6A5B8F] rounded-full w-10 h-10 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-white"
                                    >
                                        <circle cx="12" cy="8" r="5" />
                                        <path d="M12 13v9" />
                                        <path d="M9 16.5h6" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white">Our Achievement</h3>
                                {/* <p className="text-xs md:text-sm text-gray-200">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                </p> */}
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
                            <StatCard value="5+" label="Years Of Experience" />
                            <StatCard value="10K+" label="User Worldwide" />
                            <StatCard value="100+" label="Popular Features" />
                            <StatCard value="95%" label="Satisfied Client" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AchievementSection;
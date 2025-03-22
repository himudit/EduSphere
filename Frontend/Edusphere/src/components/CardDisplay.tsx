import React, { useState, useEffect } from 'react';

interface CardDisplayProps {
  image: string;
  creation: string;
  title: string;
  tags: string[];
}

const CardDisplay: React.FC<CardDisplayProps> = ({ image, creation, title, tags }) => {
  const isoDate = creation;
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Convert ISO Date
  const date = new Date(isoDate);
  const getDayWithSuffix = (day: number) => {
    if (day % 10 === 1 && day !== 11) return `${day}st`;
    if (day % 10 === 2 && day !== 12) return `${day}nd`;
    if (day % 10 === 3 && day !== 13) return `${day}rd`;
    return `${day}th`;
  };

  const day = getDayWithSuffix(date.getDate());
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  setTimeout(() => setLoading(false), 5000);

  if (loading) {
    return (
      <div className="flex flex-wrap gap-6 justify-center">
        {Array(5).fill(null).map((_, index) => (
          <div
            key={index}
            className={`bg-gray-300 animate-pulse rounded-xl overflow-hidden shadow-lg 
          ${isDesktop ? "w-[770px] h-[190px] flex -ml-[10rem]" : "w-full max-w-sm flex flex-col h-auto"}`}
          >
            {/* Image Placeholder */}
            <div className={`${isDesktop ? "w-1/3 h-auto" : "w-full h-[200px]"} bg-gray-400 animate-pulse`} />

            {/* Content Placeholder */}
            <div className={`${isDesktop ? "w-2/3 p-4 space-y-3" : "w-full p-4 space-y-3"}`}>
              <div className="w-32 h-4 bg-gray-400 rounded" /> {/* Date */}
              <div className={`${isDesktop ? "w-[25rem] h-10" : "w-full h-10"} bg-gray-500 rounded`} /> {/* Title */}
              <div className="flex flex-wrap gap-2">
                {Array(4).fill(null).map((_, i) => (
                  <div key={i} className="w-20 mt-5 h-10 bg-gray-400 rounded-2xl" />
                ))}
              </div>
              {/* <div className="w-20 h-4 bg-gray-400 rounded mt-3" /> View More */}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full max-w-3xl cursor-pointer">
      <div className="flex flex-col md:flex-row h-full">
        {/* Image Container */}
        <div className="w-full md:w-72 h-48 md:h-auto relative overflow-hidden">
          <img src={image} alt={title} className="w-full h-full" />
        </div>

        {/* Content Container */}
        <div className="flex-1 p-6">
          {/* Date and Title Section */}
          <div className="mb-4">
            <p className="text-gray-500 text-sm mb-1">{formattedDate}</p>
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 items-center">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
            <button className="text-blue-500 hover:text-blue-600 text-sm ml-auto">
              View more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDisplay;

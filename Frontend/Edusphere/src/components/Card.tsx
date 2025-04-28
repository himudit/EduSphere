import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo1.png'

interface CardProps {
  id: string;
  thumbnail: string;
  title: string;
  author: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
}

const Card: React.FC<CardProps> = ({
  id,
  thumbnail,
  title,
  author,
  description,
  rating,
  reviews,
  price,
}
) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const formattedTitle = id.replace(/\s+/g, "-");
    navigate(`/course/${formattedTitle}`);
  };
  return (
    <div onClick={handleClick} className="max-w-[19rem] sm:max-w-[16rem] h-[21rem] cursor-pointer bg-black text-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      {/* <img
        src={thumbnail}
        alt={title}
        className="w-full h-32 sm:h-40 object-fill"
      /> */}
      <img
        src={logo}
        alt={title}
        className="w-full h-[11rem] object-cover rounded"
      />

      <div className="p-3 sm:p-4">
        <h2 className="text-base sm:text-lg font-bold -mt-1 sm:-mt-3 mb-1 line-clamp-1">{title}</h2>
        <p className="text-xs sm:text-sm text-[#baf1ba] mb-1 sm:mb-2">{author}</p>
        <p className="text-xs sm:text-sm text-gray-300 mb-2 sm:mb-4 overflow-hidden text-ellipsis whitespace-nowrap">{description}</p>
        {/* jcnkfnrk */}
        <div className="flex items-center -mt-1 sm:-mt-2">
          <span className="text-xs sm:text-sm text-yellow-400 font-bold mr-1 sm:mr-2">
            {rating}
          </span>
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                fill={index < Math.floor(rating) ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={`w-3 h-3 sm:w-4 sm:h-4 ${index < Math.floor(rating) ? "text-yellow-400" : "text-gray-500"
                  }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
            ))}
          </div>
          <span className="text-xs sm:text-sm text-gray-400 ml-1 sm:ml-2">({reviews})</span>
        </div>
        <p className="text-base sm:text-lg mt-1 sm:mt-2 font-bold">₹{price}</p>
      </div>
    </div>
  );
};

export default Card;

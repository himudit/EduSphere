import React from "react";

interface CardProps {
  thumbnail: string;
  title: string;
  author: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
}

const Card: React.FC<CardProps> = ({
  thumbnail,
  title,
  author,
  description,
  rating,
  reviews,
  price,
}) => {
  return (
    <div className="max-w-[19rem] cursor-pointer bg-black text-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg sm:text-sm font-bold -mt-3 mb-1">{title}</h2>
        <p className="text-sm sm:text-sm text-[#baf1ba] mb-2">{author}</p>
        <p className="text-sm sm:text-sm text-gray-300 mb-4 overflow-hidden text-ellipsis whitespace-nowrap">{description}</p>

        <div className="flex items-center -mt-2">
          <span className="text-yellow-400 text-sm sm:text-base font-bold mr-2">
            {rating.toFixed(1)}
          </span>
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                fill={index < Math.floor(rating) ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={`w-4 h-4 ${index < Math.floor(rating) ? "text-yellow-400" : "text-gray-500"
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
          <span className="text-sm sm:text-base text-gray-400 ml-2">({reviews})</span>
        </div>
        <p className="text-lg sm:text-xl mt-2 font-bold">{price}</p>
      </div>
    </div>
  );
};

export default Card;

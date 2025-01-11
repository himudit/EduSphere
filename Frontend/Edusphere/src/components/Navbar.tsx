import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between bg-black px-6 py-4 text-white">
      {/* Logo */}
      <div className="text-2xl font-bold">LOGO</div>

      {/* Hamburger for mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          <span className="text-3xl">&#9776;</span>
        </button>
      </div>

      {/* Navbar Links */}
      <div
        className={`${isOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:gap-8 w-full md:w-auto bg-gray-800 md:bg-transparent absolute md:relative top-14 md:top-0 left-0 md:left-auto md:translate-x-0 px-6 md:px-0`}
      >
        <ul className="flex flex-col md:flex-row md:gap-6 w-full">
          <li>
            <a href="#courses" className="block py-2 md:py-0 hover:text-gray-400">
              Explore Courses
            </a>
          </li>
          <li>
            <a href="#learning" className="block py-2 md:py-0 hover:text-gray-400">
              My Learning
            </a>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="flex items-center mt-4 md:mt-0 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow w-[20rem] h-[2.5rem] md:flex-grow-0 px-3 py-1 rounded-md text-sm text-white bg-gray-900"
          />
          {/* <button className="ml-2 px-4 py-1 bg-gradient-to-r from-[#EDBAFF] via-[#7A29FF] to-[#7A29FF] text-white font-bold rounded-lg hover:from-blue-600 hover:via-green-600 hover:to-yellow-600 transition-all duration-300">
            Search
          </button> */}
        </div>
      </div>

      {/* Profile Circle */}
      <div className="hidden md:block">
        <div className="w-10 h-10 rounded-full bg-[#7A29FF] flex items-center justify-center cursor-pointer">
          <span className="text-lg font-bold">P</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

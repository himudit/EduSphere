// export default Navbar;
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import logo from '../assets/logo1.png'

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="relative bg-black text-white">
//       {/* Main Navbar Container */}
//       <div className="max-w-7xl mx-auto">
//         {/* Top Navbar */}
//         <div className="flex items-center justify-between px-4 py-4">
//           {/* Left Section */}
//           <div className="flex items-center">
//             {/* Hamburger */}
//             {!isOpen && (
//               <button onClick={toggleMenu} className="text-3xl md:hidden">
//                 &#9776;
//               </button>
//             )}

//             {/* Logo */}
//             <Link
//               to="/"
//               className="text-2xl font-bold md:mr-8 "
//             >
//               <img src={logo} alt="logo" className="w-[3rem] h-[3rem]" />
//             </Link>

//             {/* Desktop Navigation */}
//             <ul className="hidden md:flex items-center gap-8">
//               <li>
//                 <Link to="#courses" className="text-sm font-medium hover:text-purple-400 transition-colors">
//                   Explore Courses
//                 </Link>
//               </li>
//               <li>
//                 <Link to="#learning" className="text-sm font-medium hover:text-purple-400 transition-colors">
//                   My Learning
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Center Section - Search */}
//           <div className="hidden md:block flex-1 max-w-xl mx-auto px-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search courses..."
//                 className="w-full px-4 py-2 rounded-lg text-sm bg-gray-900 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none placeholder-gray-400"
//               />
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M21 21l-4.35-4.35M16.5 10a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
//                 />
//               </svg>
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center gap-4">
//             {/* Mobile Search Icon */}
//             <button className="md:hidden">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M21 21l-4.35-4.35M16.5 10a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
//                 />
//               </svg>
//             </button>

//             {/* Profile Section */}
//             <div className="flex items-center gap-3">
//               {/* Notifications */}

//               {/* Profile Picture */}
//               <div className="relative group">
//                 <button className="flex items-center gap-2">
//                   <img
//                     src="https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff"
//                     alt="Profile"
//                     className="w-8 h-8 rounded-full border-2 border-purple-500"
//                   />
//                 </button>

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 to-black text-white z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
//           } transition-transform duration-300 ease-in-out shadow-2xl`}
//       >
//         {/* Sidebar Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-800">
//           <Link to="/" className="text-2xl font-bold text-purple-400">
//             <img src={logo} alt="" className="w-[4rem] h-[4rem]" /></Link>
//           <button
//             onClick={toggleMenu}
//             className="p-2 hover:bg-gray-800 rounded-full transition-colors"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Sidebar Content */}
//         <div className="py-6">
//           {/* Profile Section in Sidebar */}
//           <div className="px-6 mb-6 flex items-center gap-3">
//             <img
//               src="https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff"
//               alt="Profile"
//               className="w-10 h-10 rounded-full border-2 border-purple-500"
//             />
//             <div>
//               <h3 className="font-medium">John Doe</h3>
//               <p className="text-sm text-gray-400">john@example.com</p>
//             </div>
//           </div>

//           <ul className="space-y-2">
//             <li>
//               <Link
//                 to="#courses"
//                 className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
//               >
//                 <svg
//                   className="w-5 h-5 mr-3"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                   />
//                 </svg>
//                 Explore Courses
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="#learning"
//                 className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
//               >
//                 <svg
//                   className="w-5 h-5 mr-3"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                   />
//                 </svg>
//                 My Learning
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="#profile"
//                 className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
//               >
//                 <svg
//                   className="w-5 h-5 mr-3"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                   />
//                 </svg>
//                 Profile
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Overlay */}
//       {isOpen && (
//         <div
//           onClick={toggleMenu}
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity"
//         ></div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo1.png'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative bg-black text-white">
      {/* Main Navbar Container */}
      <div className="max-w-7xl mx-auto">
        {/* Top Navbar */}
        <div className="flex items-center justify-between px-4 py-4 relative">
          {/* Mobile Left - Hamburger */}
          <div className="md:hidden">
            {!isOpen && (
              <button onClick={toggleMenu} className="text-2xl">
                &#9776;
              </button>
            )}
          </div>

          {/* Desktop Left Section */}
          <div className="hidden md:flex items-center">
            {/* Logo for Desktop */}
            <Link to="/" className="text-2xl font-bold mr-8">
              <img src={logo} alt="logo" className="w-[3rem] h-[3rem]" />
            </Link>

            {/* Desktop Navigation */}
            <ul className="flex items-center gap-8">
              <li>
                <Link to="#courses" className="text-sm font-medium hover:text-purple-400 transition-colors">
                  Explore Courses
                </Link>
              </li>
              <li>
                <Link to="#learning" className="text-sm font-medium hover:text-purple-400 transition-colors">
                  My Learning
                </Link>
              </li>
            </ul>
          </div>

          {/* Center Logo for Mobile */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:hidden">
            <Link to="/" className="text-2xl font-bold">
              <img src={logo} alt="logo" className="w-[3rem] h-[3rem]" />
            </Link>
          </div>

          {/* Center Section - Search (Desktop Only) */}
          <div className="hidden md:block flex-1 max-w-xl mx-auto px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full px-4 py-2 rounded-lg text-sm bg-gray-900 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none placeholder-gray-400"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M16.5 10a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                />
              </svg>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Mobile Search Icon */}
            <button className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M16.5 10a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                />
              </svg>
            </button>

            {/* Profile Section */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="hidden md:block hover:text-purple-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              {/* Profile Picture */}
              <div className="relative group">
                <button className="flex items-center gap-2">
                  <img
                    src="https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff"
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-purple-500"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="hidden md:block h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div className="hidden group-hover:block absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the code (Sidebar and Overlay) remains the same */}
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 to-black text-white z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out shadow-2xl`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <Link to="/" className="text-2xl font-bold text-purple-400"> <img src={logo} alt="logo" className="w-[3rem] h-[3rem]" /></Link>
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="py-6">
          {/* Profile Section in Sidebar */}
          <div className="px-6 mb-6 flex items-center gap-3">
            <img
              src="https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-purple-500"
            />
            <div>
              <h3 className="font-medium">John Doe</h3>
              <p className="text-sm text-gray-400">john@example.com</p>
            </div>
          </div>

          <ul className="space-y-2">
            <li>
              <Link
                to="#courses"
                className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Explore Courses
              </Link>
            </li>
            <li>
              <Link
                to="#learning"
                className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                My Learning
              </Link>
            </li>
            <li>
              <Link
                to="#profile"
                className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
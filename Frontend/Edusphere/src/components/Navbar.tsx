import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from '../assets/logo1.png'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { fetchUserProfile, addUser, removeUser } from "../features/userSlice";


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { user, loading, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const navigate = useNavigate();

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
                <Link to="/search" className="text-sm font-medium hover:text-purple-400 transition-colors">
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

              {/* Profile Picture */}
              <div className="relative group">
                {
                  (user?.student_profile_picture || user?.teacher_profile_picture)
                    ?
                    <img
                      src={user?.student_profile_picture || logo || user?.teacher_profile_picture}
                      alt="Profile"
                      className="w-12 h-12 rounded-full border-2 border-purple-500"
                      onClick={() => {
                        navigate('/profile');
                      }}
                    />
                    :
                    <div className="flex items-center space-x-2">
                      <Link
                        to="/login"
                        className="text-gray-500 hover:text-white transition duration-300"
                      >
                        Login
                      </Link>
                      <span className="text-gray-400">or</span>
                      <Link
                        to="/signup"
                        className="text-gray-500 hover:text-white transition duration-300"
                      >
                        Signup
                      </Link>
                    </div>
                }
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
              src={user?.student_profile_picture || logo || user?.teacher_profile_picture}
              alt="Profile"
              className="w-[5rem] h-[5rem] rounded-full border-2 border-purple-500"
            />
            <div>
              <h3 className="font-medium">{user?.first_name} {user?.last_name}</h3>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>

          <ul className="space-y-2">
            <li>
              <Link
                to="/search"
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
                to="/profile"
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
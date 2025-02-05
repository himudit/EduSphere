import React, { useEffect, useState } from 'react';
import logo from '../assets/logo1.png';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { fetchUserProfile, addUser, removeUser } from "../features/userSlice";

const Profile: React.FC = () => {
    const [studentData, setStudentData] = useState<any>({});
    const { user, loading, error } = useSelector((state: RootState) => state.user);

    return (
        <>
            <div className="max-w-4xl mx-auto mt-10 bg-black text-white rounded-lg shadow-md">
                {/* Header Section */}
                <div className="flex flex-wrap items-start gap-6 p-5">
                    {/* Profile Info - 65% */}
                    <div className="flex-[65%] min-w-[65%] bg-black">
                        <div className="p-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg h-24"></div>
                        <div className="-mt-14 lg:ml-[1rem] flex justify-center md:justify-start">
                            <img
                                src={user?.student_profile_picture || logo || user?.teacher_profile_picture}
                                alt="Profile"
                                className="w-[9rem] h-[9rem] rounded-full border-4 border-white"
                            />
                        </div>
                        <div className="mt-4 text-center md:text-left">
                            <h1 className="text-2xl lg:ml-[2rem] font-bold">{user?.first_name || "John Doe"}</h1>
                            <p className="text-sm lg:ml-[2rem] text-gray-400">{"Software Developer"}</p>
                        </div>
                    </div>

                    {/* Intro Section - 35% */}
                    <div className="flex-[30%] min-w-[30%] bg-[#212529] rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">Intro</h2>
                        <hr className="border-gray-700 mb-4" />
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <i className="fas fa-briefcase mr-2 text-blue-500"></i>
                                <span>CMO at SingleFire</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-graduation-cap mr-2 text-blue-500"></i>
                                <span>Went to Oxford International</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-map-marker-alt mr-2 text-blue-500"></i>
                                <span>Lives in Virginia, NY</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-users mr-2 text-blue-500"></i>
                                <span>Followed by 12.5k people</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-envelope mr-2 text-blue-500"></i>
                                <span>Email: <a href="mailto:jhon@contact.com" className="text-blue-400 underline">{user?.email}</a></span>
                            </li>
                            <li className="flex items-center">
                                <i className="fab fa-linkedin mr-2 text-blue-500"></i>
                                <span>LinkedIn: <a href="#" className="text-blue-400 underline">{user?.student_linkedin}</a></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="max-w-4xl mx-auto mt-6 bg-black text-white rounded-lg shadow-md">
                <div className="flex flex-wrap gap-6 p-5">
                    {/* About Info - 65% */}
                    <div className="flex-[65%] min-w-[65%]">
                        <h2 className="text-lg font-bold mb-2">About</h2>
                        <p className="text-sm text-gray-400">
                            {user?.student_about || "No additional information provided."}
                        </p>
                    </div>

                    {/* Extra Section - 35% */}
                    {/* <div className="flex-[35%] min-w-[35%] bg-[#212529] rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-center">More Info</h3>
                        
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default Profile;

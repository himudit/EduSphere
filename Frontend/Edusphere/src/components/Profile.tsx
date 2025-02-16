import React, { useEffect, useState } from 'react';
import logo from '../assets/logo1.png';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { fetchUserProfile, addUser, removeUser } from "../features/userSlice";
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
    const [studentData, setStudentData] = useState<any>({});
    const { user, loading, error } = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    return (
        <>
            <div className="max-w-4xl mx-auto mt-10 bg-black text-white rounded-lg shadow-md">
                {/* Header Section */}
                <div className="flex flex-wrap items-start gap-6 p-5">
                    {/* Profile Info - 65% */}
                    <div className="flex-[65%] min-w-[65%] bg-black">
                        <div className="p-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg h-24"></div>
                        <div className="-mt-14 lg:ml-[1rem] flex justify-center md:justify-start">
                            {(user!=null && user.role === "students") ?
                                <img
                                    src={user?.student_profile_picture || "https://static.vecteezy.com/system/resources/previews/045/944/199/non_2x/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg"} alt="StudentProfile"
                                    className="w-[9rem] h-[9rem] rounded-full border-4 border-white" /> :
                                <img
                                    src={user?.teacher_profile_picture || "https://www.saraswatiias.com/wp-content/uploads/2018/11/dummy-profile-pic-male1.jpg"}
                                    alt="TeacherProfile"
                                    className="w-[9rem] h-[9rem] rounded-full border-4 border-white"
                                />}
                        </div>
                        <div className="mt-4 text-center md:text-left">
                            <h1 className="text-2xl lg:ml-[2rem] font-bold">{user?.first_name || "John Doe"}</h1>
                            <p className="text-sm lg:ml-[2rem] text-gray-400">{"Software Developer"}</p>
                        </div>
                        <div className='flex items-center justify-evenly'>
                            <button onClick={() => {
                                navigate(`/profile/${user.role}/edit`)
                            }} className="bg-black w-[6rem] h-[3rem] border border-white rounded-lg text-white font-bold">Edit Profile</button>
                            <button onClick={() => {
                                if (localStorage.getItem('token')) {
                                    localStorage.removeItem('token');
                                    console.log("'token' has been deleted from local storage.");
                                }
                                else if (localStorage.getItem('teacher_token')) {
                                    localStorage.removeItem('teacher_token');
                                    console.log("'teacher_token' has been deleted from local storage.");
                                }
                                else {
                                    console.log("No token found in local storage.");
                                }
                                dispatch(removeUser());
                                navigate('/');
                            }} className="bg-blue-300  w-[6rem] h-[3rem] border border-white rounded-lg text-white font-bold">Logout</button>
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
                            {user?.student_about || user?.teacher_about || "No additional information provided."}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;

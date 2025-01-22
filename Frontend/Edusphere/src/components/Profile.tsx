import React, { useEffect, useState } from 'react';
import logo from '../assets/logo1.png'
import axios from 'axios'

const Profile: React.FC = () => {
    const [studentData, setStudentData] = useState({});
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/students/profile`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setStudentData(response.data);
                console.log(response.data);  // This will contain the data returned by the server
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);
    return (
        <div className="max-w-[50rem] mx-auto mt-10 bg-black text-white rounded-lg shadow-md">
            {/* Header Section */}
            <div className="p-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg h-[8rem]">

            </div>

            <div className="-mt-16 lg:ml-[4rem] md:ml-[0rem] flex flex-col md:flex-row items-center md:items-start md:justify-star">
                <img
                    src={studentData.student_profile_picture
                    }
                    alt="Profile"
                    className="w-[9rem] h-9rem] rounded-full border-4 border-white mb-4 md:mb-0"
                />
            </div>

            <div className="lg:ml-6 md:ml-2 p-5 grid grid-cols-1 md:grid-cols-2 gap-2 ">
                <div className="text-center md:text-left md:ml-4">
                    <h1 className="text-xl md:text-2xl font-bold">{studentData.first_name}</h1>
                    <p className="text-sm mt-1 flex items-center justify-center md:justify-start">
                        <span className="mr-2">📁</span> Working at Adobe
                    </p>
                    <p className="text-sm mt-1 flex items-center justify-center md:justify-start">
                        <span className="mr-2">📍</span> Bangalore, India
                    </p>
                </div>
            </div>
            {/* Contact Section */}
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-2 ">
                <div className="flex items-center justify-center md:justify-start">
                    <span className="mr-2">📱</span>
                    <p className="text-sm">+91987654321</p>
                </div>
                <div className="flex items-center justify-center md:justify-end">
                    <span className="mr-2">✉️</span>
                    <p className="text-sm">{studentData.email}</p>
                </div>
            </div>

            {/* About Section */}
            <div className="p-5 border-t border-gray-700">
                <h2 className="text-lg font-bold mb-2 text-center md:text-left">About</h2>
                <p className="text-sm leading-relaxed text-center md:text-left">
                    {studentData.student_about}
                </p>
            </div>
        </div>
    );
};

export default Profile;

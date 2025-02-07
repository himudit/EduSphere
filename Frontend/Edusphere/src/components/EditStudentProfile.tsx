import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import '../index.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Student {
    first_name: string,
    last_name: string,
    student_about: string,
    student_address: string,
    student_gender: string,
    student_github: string,
    student_linkedin: string,
    student_mobile: string,
    student_profile_picture: string,
    student_skills: string[],
    student_twitter: string,
    student_university: string,
}

const UserProfile = () => {
    const notify = () => toast.success("Profile updated Successfully!");
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [studentData, setStudentData] = useState<Student | undefined>();

    const onSubmit = async (data: any) => {
        try {
            const payload = {
                ...data,
                student_skills: skills // Add skills array to the payload
            };
            const response = await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/students/profile/edit`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Send the JWT token
                    }
                }
            );
            notify();
        } catch (err) {
            console.error('Failed to update profile:', err.response?.data || err.message);
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/students/profile`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                // console.log(response.data);
                setStudentData(response.data);
                if (response.data) {
                    setValue("first_name", response.data.first_name);
                    setValue("last_name", response.data.last_name);
                    setValue("student_address", response.data.student_address);
                    setValue("student_gender", response.data.student_gender);
                    setValue("student_mobile", response.data.student_mobile);
                    setValue("student_about", response.data.student_about);
                    setValue("student_university", response.data.student_university);
                    setValue("student_github", response.data.student_github);
                    setValue("student_linkedin", response.data.student_linkedin);
                    setValue("student_twitter", response.data.student_twitter);
                    setSkills(response.data.student_skills);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);


    const [showAddSkillModal, setShowAddSkillModal] = useState(false);
    const [newSkill, setNewSkill] = useState('');
    const [skills, setSkills] = useState<string[]>([]);

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill('');
            setShowAddSkillModal(false);
        }
    };

    const [selectedFile, setSelectedFile] = useState<File | null>(null);;
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append("image", selectedFile);
        try {
            const response = await axios.post<{ imageUrl: string }>(
                `${import.meta.env.VITE_BASE_URL}/students/profile/upload/image`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            alert("Image uploaded successfully!");
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto p-6">
            <div className="max-w-7xl mx-auto p-6">
                {/* Main Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* First Column */}
                    <div className="flex flex-col gap-6">
                        {/* Profile Photo Section */}
                        <div className="bg-[#212529] shadow-md rounded-lg p-6 flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 mb-4">
                                <img
                                    src={preview || studentData?.student_profile_picture || '/default-avatar.png'}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-center text-gray-600">
                                {selectedFile ? "New Photo Selected" : "Your Photo"}
                            </p>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                ref={fileInputRef}
                                className="hidden"
                            />

                            <button
                                className="mt-4 px-6 py-2 bg-[#A48AFB] text-white rounded-lg hover:bg-[#D1C4FF]"
                                onClick={() => fileInputRef.current.click()}
                            >
                                {selectedFile ? "Change File" : "Upload New"}
                            </button>

                            {selectedFile && (
                                <button
                                    className="mt-2 px-6 py-2 border rounded-lg hover:bg-gray-100"
                                    onClick={handleUpload}
                                >
                                    Save Changes
                                </button>
                            )}
                        </div>

                        {/* Personal Information */}
                        <div className="bg-[#212529] shadow-md rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-400 mb-4">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <i className="fas fa-user text-gray-400 mr-3"></i>
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        {...register("first_name", {
                                            required: "First Name is required",
                                            minLength: { value: 3, message: "Minimum length is 3 characters" },
                                            maxLength: { value: 20, message: "Maximum length is 20 characters" }
                                        })}
                                        className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}

                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-user text-gray-400 mr-3"></i>
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        {...register("last_name", {
                                            minLength: { value: 3, message: "Minimum length is 3 characters" },
                                            maxLength: { value: 20, message: "Maximum length is 20 characters" }
                                        })}
                                    />
                                    {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-phone-alt text-gray-400 mr-3"></i>
                                    <input
                                        type="text"
                                        placeholder="Mobile Number"
                                        className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        {...register("student_mobile", {
                                            minLength: { value: 10, message: "Minimum length is 10 characters" },
                                            maxLength: { value: 10, message: "Maximum length is 10 characters" }
                                        })}
                                    />
                                    {errors.student_mobile && <p className="text-red-500 text-sm">{errors.student_mobile.message}</p>}
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label className="text-gray-400 font-medium">Gender</label>
                                    <div className="flex items-center space-x-4">
                                        <label className="flex items-center">
                                            <input type="radio" {...register("student_gender", { required: "Gender is required" })} value="MALE" className="mr-2" />
                                            Male
                                        </label>
                                        <label className="flex items-center">
                                            <input type="radio" {...register("student_gender", { required: "Gender is required" })} value="FEMALE" className="mr-2" />
                                            Female
                                        </label>
                                        <label className="flex items-center">
                                            <input type="radio" {...register("student_gender", { required: "Gender is required" })} value="OTHER" className="mr-2" />
                                            Other
                                        </label>
                                    </div>
                                </div>

                                {/* Address Field */}
                                <div className="flex items-center col-span-1 md:col-span-2">
                                    <i className="fas fa-envelope text-gray-400 mr-3"></i>
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        {...register("student_address")}
                                    />
                                </div>

                                <div className="flex items-center col-span-1 md:col-span-2">
                                    <i className="fas fa-university text-gray-400 mr-3"></i>
                                    <input
                                        type="text"
                                        placeholder="University"
                                        className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        {...register("student_university")}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Second Column */}
                    <div className="flex flex-col gap-6">
                        {/* About Section */}
                        <div className="bg-[#212529] shadow-md rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-400 mb-4">About</h3>
                            <textarea
                                rows={6}
                                placeholder="Write your bio here..."
                                className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("student_about", {
                                    minLength: { value: 3, message: "Minimum length is 3 characters" },
                                    maxLength: { value: 300, message: "Maximum length is 300 characters" }
                                })}
                            ></textarea>
                            {errors.student_about && <p className="text-red-500 text-sm">{errors.student_about.message}</p>}
                        </div>

                        {/* Skill Section */}
                        <div className="bg-[#212529] shadow-md rounded-lg p-6 relative">
                            <h3 className="text-lg font-semibold text-gray-400 mb-4">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.length > 0 && skills?.map((skill) => (
                                    <div
                                        key={skill}
                                        className="group relative inline-flex items-center px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                                    >
                                        <span>{skill}</span>
                                        <button
                                            onClick={() => setSkills(skills.filter(s => s !== skill))}
                                            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-black "
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className="text-blue-500 mt-2 hover:text-blue-600 transition-colors"
                                    onClick={() => setShowAddSkillModal(true)}
                                >
                                    + Add more
                                </button>
                            </div>

                            {/* Modal Overlay */}
                            {showAddSkillModal && (
                                <div
                                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                                    onClick={() => {
                                        setShowAddSkillModal(false);
                                        setNewSkill('');
                                    }}
                                >
                                    <div
                                        className="bg-black rounded-lg p-6 w-96 border border-white"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <h3 className="text-lg font-semibold mb-4">Add New Skill</h3>
                                        <input
                                            type="text"
                                            placeholder="Add your skill"
                                            className="w-full p-2 border rounded-lg mb-4 text-black"
                                            value={newSkill}
                                            onChange={(e) => setNewSkill(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                                        />
                                        <div className="flex justify-end gap-2">
                                            <button
                                                className="px-4 py-2 text-gray-400 hover:bg-gray-100 rounded-lg"
                                                onClick={() => {
                                                    setShowAddSkillModal(false);
                                                    setNewSkill('');
                                                }}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                                onClick={handleAddSkill}
                                            >
                                                Add Skill
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Social Media Accounts Section */}
                        <div className="bg-[#212529] shadow-lg rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-400 mb-6">Social Media Accounts</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <FontAwesomeIcon icon={faLinkedin} className="text-blue-500" />
                                    <input
                                        type="url"
                                        placeholder="https://linkedin.com/in/YourUsername"
                                        className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        {...register("student_linkedin", {
                                            minLength: { value: 10, message: "Minimum length is 10 characters" },
                                            maxLength: { value: 50, message: "Maximum length is 50 characters" }
                                        })}
                                    />
                                    {errors.student_linkedin && <p className="text-red-500 text-sm">{errors.student_linkedin.message}</p>}
                                </div>
                                <div className="flex items-center gap-4">
                                    <FontAwesomeIcon icon={faGithub} className="text-gray-300" />
                                    <input
                                        type="url"
                                        placeholder="https://github.com/YourUsername"
                                        className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        {...register("student_github", {
                                            minLength: { value: 10, message: "Minimum length is 10 characters" },
                                            maxLength: { value: 50, message: "Maximum length is 50 characters" }
                                        })}
                                    />
                                    {errors.student_github && <p className="text-red-500 text-sm">{errors.student_github.message}</p>}
                                </div>
                                <div className="flex items-center gap-4">
                                    <FontAwesomeIcon icon={faTwitter} className="text-blue-400" />
                                    <input
                                        type="url"
                                        placeholder="https://twitter.com/YourUsername"
                                        className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        {...register("student_twitter", {
                                            minLength: { value: 10, message: "Minimum length is 10 characters" },
                                            maxLength: { value: 50, message: "Maximum length is 50 characters" }
                                        })}
                                    />
                                    {errors.student_twitter && <p className="text-red-500 text-sm">{errors.student_twitter.message}</p>}
                                </div>
                            </div>
                        </div>

                        <button type='submit' className='w-20 h-15 bg-blue-500 border rounded-lg'>Save Changes</button>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </form >
    );
};

export default UserProfile;

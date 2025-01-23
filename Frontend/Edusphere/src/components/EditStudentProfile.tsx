import React from 'react';

const UserProfile = () => {
    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Main Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* First Column */}
                <div className="flex flex-col gap-6">
                    {/* Profile Photo Section */}
                    <div className="bg-[#212529] shadow-md rounded-lg p-6 flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 mb-4">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="text-center text-gray-600">Your Photo</p>
                        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Upload New</button>
                        <button className="mt-2 px-6 py-2 border rounded-lg">Save</button>
                    </div>

                    {/* Personal Information */}
                    <div className="bg-[#212529] shadow-md rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <i className="fas fa-user text-gray-500 mr-3"></i>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-user text-gray-500 mr-3"></i>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-phone-alt text-gray-500 mr-3"></i>
                                <input
                                    type="text"
                                    placeholder="Mobile Number"
                                    className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-envelope text-gray-500 mr-3"></i>
                                <input
                                    type="text"
                                    placeholder="Gender"
                                    className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                                />
                            </div>
                            {/* Address Field */}
                            <div className="flex items-center col-span-1 md:col-span-2">
                                <i className="fas fa-envelope text-gray-500 mr-3"></i>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                                />
                            </div>
                            {/* University Field */}
                            <div className="flex items-center col-span-1 md:col-span-2">
                                <i className="fas fa-envelope text-gray-500 mr-3"></i>
                                <input
                                    type="text"
                                    placeholder="University"
                                    className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Second Column */}
                <div className="flex flex-col gap-6">
                    {/* Bio Section */}
                    <div className="bg-[#212529] shadow-md rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">About</h3>
                        <textarea
                            rows="6"
                            placeholder="Write your bio here..."
                            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                        ></textarea>
                    </div>

                    {/* Industry/Interests Section */}
                    <div className="bg-[#212529] shadow-md rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Skills/Interest</h3>
                        <div className="flex flex-wrap gap-2">
                            {['UI Design', 'Framer', 'Startups', 'UX', 'Crypto', 'Mobile Apps', 'Webflow'].map((interest) => (
                                <span
                                    key={interest}
                                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm"
                                >
                                    {interest}
                                </span>
                            ))}
                            <button className="text-blue-500 underline mt-2">+ Add more</button>
                        </div>
                    </div>

                    {/* Social Media Accounts Section */}
                    <div className="bg-[#212529] shadow-md rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Social Media Accounts</h3>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <i className="fab fa-linkedin text-blue-700 mr-3"></i>
                                <input
                                    type="url"
                                    placeholder="https://linkedin.com/in/YourUsername"
                                    className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <div className="flex items-center">
                                <i className="fab fa-instagram text-pink-500 mr-3"></i>
                                <input
                                    type="url"
                                    placeholder="https://github.com/YourUsername"
                                    className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <div className="flex items-center">
                                <i className="fab fa-twitter text-blue-500 mr-3"></i>
                                <input
                                    type="url"
                                    placeholder="https://twitter.com/YourUsername"
                                    className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                                />
                            </div>
                            {/* <button className="text-blue-500 underline mt-2">+ Add more</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

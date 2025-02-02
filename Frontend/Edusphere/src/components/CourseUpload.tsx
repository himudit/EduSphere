import { useState } from "react";

const CourseUpload = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        course_id: "",
        course_title: "",
        course_description: "",
        course_price: 0,
        course_no_of_purchase: 0,
        course_total_no_hours: 0,
        rating: 1.0,
        creation: new Date(),
        course_preview_video: "https://res.cloudinary.com/dy8jwwm6j/video/upload/v1736872825/12927954_1920_1080_24fps_szansr.mp4",
        course_what_you_will_learn: [],
        course_author: "John Doe",
        course_keywords: [],
        course_level: ["Intermediate"],
    });

    const [titleSize, setTitleSize] = useState(20); // 20 chars limit for course title
    const [descriptionSize, setDescriptionSize] = useState(150); // 150 chars limit for course description

    const [courseImage, setCourseImage] = useState<File | null>(null); // State for course image
    const [promoVideo, setPromoVideo] = useState<File | null>(null); // State for promotional video
    const [imageError, setImageError] = useState(""); // Error message for course image
    const [videoError, setVideoError] = useState(""); // Error message for promotional video

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Course title size limit validation
        if (name === "course_title") {
            if (value.length <= 20) {
                setTitleSize(20 - value.length); // Update remaining characters
                setFormData((prev) => ({
                    ...prev,
                    [name]: value,
                }));
            }
        }

        // Course description size limit validation
        if (name === "course_description") {
            if (value.length <= 150) {
                setDescriptionSize(150 - value.length); // Update remaining characters
                setFormData((prev) => ({
                    ...prev,
                    [name]: value,
                }));
            }
        }
    };

    const handleArrayChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: keyof typeof formData) => {
        const { value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [field]: value.split("\n"),
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate image size (750x422px)
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                if (img.width >= 750 && img.height >= 422) {
                    setCourseImage(file);
                    setImageError("");
                } else {
                    setImageError("Minimum image size is 750x422px. Please upload a larger image.");
                }
            };
        }
    };

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate video file type
            if (file.type.startsWith("video/")) {
                setPromoVideo(file);
                setVideoError("");
            } else {
                setVideoError("Please upload a valid video file.");
            }
        }
    };

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

    const [textPoints, setTextPoints] = useState([1]);  // Track the number of text-points

    // Function to add a new text-point input
    const addTextPoint = () => {
        setTextPoints([...textPoints, textPoints.length + 1]);
    };
    const removeTextPoint = (index: number) => {
        setTextPoints(textPoints.filter((_, i) => i !== index));
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
            {/* Step Indicator */}
            <div className="flex justify-between items-center mb-6 relative">
                <div className="absolute top-5 left-10 right-10 h-1 bg-gray-700 z-0"></div>
                {[1, 2, 3].map((num) => (
                    <div key={num} className="flex flex-col items-center z-10">
                        <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-semibold transition-all duration-300 
                            ${step === num ? "bg-purple-500 text-white scale-110" : "bg-gray-700 text-gray-300"}`}
                        >
                            {num}
                        </div>
                        <span className={`text-sm mt-2 ${step === num ? "text-purple-400" : "text-gray-400"}`}>
                            {num === 1 ? "Course Info" : num === 2 ? "Lectures" : "Pricing"}
                        </span>
                    </div>
                ))}
            </div>

            {/* Step 1: Course Info */}
            {step === 1 && (
                <div>
                    <label className="block mb-2">Course Title</label>
                    <div className="relative">
                        <input
                            name="course_title"
                            value={formData.course_title}
                            onChange={handleChange}
                            className={`w-full p-2 bg-gray-800 rounded`}
                            placeholder="Enter course title"
                        />
                        <span className="absolute right-4 bottom-2 text-sm text-gray-300">{titleSize}</span>
                    </div>

                    <label className="block mt-4 mb-2">Course Description</label>
                    <div className="relative">
                        <textarea
                            name="course_description"
                            value={formData.course_description}
                            onChange={handleChange}
                            className={`w-full p-2 bg-gray-800 rounded`}
                            placeholder="Enter description"
                        />
                        <span className="absolute right-4 bottom-2 text-sm text-gray-300">{descriptionSize}</span>
                    </div>

                    {/* Course Image Upload */}
                    <label className="block mt-4 mb-2">Course Image</label>
                    <div className="mb-4">
                        <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                            {courseImage ? (
                                <img
                                    src={URL.createObjectURL(courseImage)}
                                    alt="Course Thumbnail"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <img
                                    src="https://via.placeholder.com/750x422"
                                    alt="Placeholder Thumbnail"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .gif, .png"
                            onChange={handleImageUpload}
                            className="w-full p-2 bg-gray-800 rounded mt-2"
                        />
                        {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
                    </div>

                    {/* Promotional Video Upload */}
                    <label className="block mt-4 mb-2">Promotional Video</label>
                    <div className="mb-4">
                        <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                            {promoVideo ? (
                                <video
                                    src={URL.createObjectURL(promoVideo)}
                                    controls
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <video
                                    src="https://res.cloudinary.com/dy8jwwm6j/video/upload/v1736872825/12927954_1920_1080_24fps_szansr.mp4"
                                    controls
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoUpload}
                            className="w-full p-2 bg-gray-800 rounded mt-2"
                        />
                        {videoError && <p className="text-red-500 text-sm mt-1">{videoError}</p>}
                    </div>

                </div>
            )}

            {/* Step 2: Lectures (Placeholder for now) */}
            {step === 2 && <div className="h-40 flex justify-center items-center text-gray-500">Lecture Upload Section (Coming Soon)</div>}

            {/* Step 3: Pricing & Prerequisites */}
            {step === 3 && (
                <div>
                    <label className="block mb-2">Course Price</label>
                    <input
                        name="course_price"
                        value={formData.course_price}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 rounded"
                        placeholder="Enter price"
                    />

                    <label className="block mt-4 mb-2">Course Level</label>
                    <select
                        name="course_level"
                        value={formData.course_level[0]} // Bind the value to the first element of the array
                        onChange={handleChange} // Handle value change
                        className="w-full p-2 bg-gray-800 rounded"
                    >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>

                    <div className="mt-8 bg-gray-800 shadow-md rounded-lg p-6 relative">
                        <h3 className="text-lg text-white mb-5">Keywords</h3>
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

                    {/* Course What You will Learn */}
                    <div className="mt-8 bg-gray-800 shadow-md rounded-lg p-6 relative">
                        <label className="block text-lg font-medium mt-6 text-white">What You Will Learn</label>
                        <div className="space-y-4 mt-2">
                            {textPoints.map((point, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        className="p-2 w-full bg-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                        placeholder={`Text Point ${point}`}
                                    />
                                    {/* Delete Button (SVG) */}
                                    <button
                                        onClick={() => removeTextPoint(index)}
                                        className="text-white focus:outline-none"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
                                            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                                    </button>
                                </div>
                            ))}
                            {/* Add Button */}
                            <button
                                onClick={addTextPoint}
                                className="mt-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                            >
                                + Add another point
                            </button>
                        </div>
                    </div>

                </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
                {step > 1 && <button onClick={prevStep} className="px-4 py-2 bg-gray-700 rounded">Previous</button>}
                {step < 3 ? (
                    <button onClick={nextStep} className="px-4 py-2 bg-purple-500 rounded">Next</button>
                ) : (
                    <button className="px-4 py-2 bg-green-500 rounded">Submit</button>
                )}
            </div>
        </div>
    );
};

export default CourseUpload;
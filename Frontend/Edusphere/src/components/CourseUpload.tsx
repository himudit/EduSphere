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
                            className={`w-full p-2 bg-gray-800 rounded ${titleSize === 0 ? 'border-red-500' : ''}`}
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
                            className={`w-full p-2 bg-gray-800 rounded ${descriptionSize === 0 ? 'border-red-500' : ''}`}
                            placeholder="Enter description"
                        />
                        <span className="absolute right-4 bottom-2 text-sm text-gray-300">{descriptionSize}</span>
                    </div>

                    {/* Course Image Upload */}
                    <label className="block mt-4 mb-2">Course Image</label>
                    <div className="mb-4">
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .gif, .png"
                            onChange={handleImageUpload}
                            className="w-full p-2 bg-gray-800 rounded"
                        />
                        {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
                    </div>

                    {/* Promotional Video Upload */}
                    <label className="block mt-4 mb-2">Promotional Video</label>
                    <div className="mb-4">
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoUpload}
                            className="w-full p-2 bg-gray-800 rounded"
                        />
                        {videoError && <p className="text-red-500 text-sm mt-1">{videoError}</p>}
                    </div>

                    <label className="block mt-4 mb-2">What You Will Learn (One per line)</label>
                    <textarea
                        name="course_what_you_will_learn"
                        value={formData.course_what_you_will_learn.join("\n")}
                        onChange={(e) => handleArrayChange(e, "course_what_you_will_learn")}
                        className="w-full p-2 bg-gray-800 rounded"
                        placeholder="Enter bullet points"
                    />
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
                        value={formData.course_level[0]}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 rounded"
                    >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
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
import { Key, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { fetchUserProfile, addUser, removeUser } from "../features/userSlice";
import { nanoid } from "nanoid";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CourseFormData {
    course_id: string;
    course_title: string;
    course_description: string;
    course_price: number;
    course_no_of_purchase: number;
    course_total_no_hours: number;
    rating: number;
    creation: Date;
    course_thumbnail: String,
    course_preview_video: string;
    course_what_you_will_learn: string[];
    course_author: string;
    course_keywords: string[];
    course_level: string;
}

interface Video {
    video_id: string;
    lecture_id: string;
    video_title: string;
    video_url: string;
    video_order: number;
    video_total_no_of_hours?: number;
    creation: Date;
}

interface Lecture {
    lecture_id: string;
    course_id?: string;
    lecture_title: string;
    lecture_description: string;
    lecture_order: number;
    lecture_total_no_hours?: number;
    creation: Date;
    videos: Video[];
}

const CourseUpload = () => {
    const notify = () => toast.success("Course uploaded Successfully!");
    const { user, loading, error } = useSelector((state: RootState) => state.user);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<CourseFormData>({
        course_id: nanoid(),
        course_title: "",
        course_description: "",
        course_price: 0,
        course_no_of_purchase: 0,
        course_total_no_hours: 0,
        rating: 1.0,
        creation: new Date(),
        course_thumbnail: "",
        course_preview_video: "https://res.cloudinary.com/dy8jwwm6j/video/upload/v1736872825/12927954_1920_1080_24fps_szansr.mp4",
        course_what_you_will_learn: [],
        course_author: "",
        course_keywords: [],
        course_level: "Intermediate",
    });

    const [titleSize, setTitleSize] = useState(30);
    const [descriptionSize, setDescriptionSize] = useState(150);

    const [courseImage, setCourseImage] = useState<File | null>(null);
    const [promoVideo, setPromoVideo] = useState<File | null>(null);
    const [imageError, setImageError] = useState("");
    const [videoError, setVideoError] = useState("");

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "course_title") {
            if (value.length <= 20) {
                setTitleSize(20 - value.length);
                setFormData((prev) => ({
                    ...prev,
                    [name]: value,
                }));
            }
            setFormData((prev) => ({
                ...prev,
                ['course_author']: user?.first_name,
            }));
        }

        if (name === "course_description") {
            if (value.length <= 150) {
                setDescriptionSize(150 - value.length); // Update remaining characters
                setFormData((prev) => ({
                    ...prev,
                    [name]: value,
                }));
            }
        }

        if (name === "course_price") {
            setFormData((prev) => ({
                ...prev,
                [name]: Number(value),
            }));
            // if (!isNaN(Number(value)) && Number(value) >= 0) {
            //     setFormData((prev) => ({
            //         ...prev,
            //         [name]: Number(value),
            //     }));
            // }
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "lmsupload");
            formData.append("folder", "courseThumbnail");
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = async () => {
                if (img.width >= 750 && img.height >= 422) {
                    try {
                        setCourseImage(file);
                        setImageError("");

                        const response = await fetch("https://api.cloudinary.com/v1_1/dy8jwwm6j/upload", {
                            method: "POST",
                            body: formData,
                        });

                        const data = await response.json();
                        if (data.secure_url) {
                            setFormData((prev) => ({
                                ...prev,
                                course_thumbnail: data.secure_url,
                            }));
                        }
                        console.log(data.secure_url);
                    } catch (error) {
                        console.error("Error uploading file:", error);
                    }
                } else {
                    setImageError("Minimum image size is 750x422px. Please upload a larger image.");
                }
            };
        }
    };

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate video file type
            if (!file.type.startsWith("video/")) {
                setVideoError("Please upload a valid video file.");
                return;
            }

            setPromoVideo(file);
            setVideoError("");

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "lmsupload"); // Replace with your Cloudinary upload preset
            formData.append("folder", "coursePreviewVideo"); // Folder for storing videos

            try {
                const response = await fetch("https://api.cloudinary.com/v1_1/dy8jwwm6j/upload", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();
                if (data.secure_url) {
                    setFormData((prev) => ({
                        ...prev,
                        course_preview_video: data.secure_url, // Update state with uploaded video URL
                    }));
                }
                console.log("Video uploaded:", data.secure_url);
            } catch (error) {
                console.error("Error uploading video:", error);
                setVideoError("Error uploading video. Please try again.");
            }
        }
    };

    const [showAddSkillModal, setShowAddSkillModal] = useState(false);
    const [newSkill, setNewSkill] = useState<string>('');
    const [skills, setSkills] = useState<string[]>([]);

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            const updatedSkills = [...skills, newSkill.trim()];
            setSkills(updatedSkills);
            setNewSkill('');
            setShowAddSkillModal(false);
            setFormData((prev) => ({
                ...prev,
                course_keywords: updatedSkills,
            }));
        }
    };

    const [course_level, setCourseLevel] = useState("Intermediate");

    const handleChangeLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCourseLevel(e.target.value);
        setFormData((prev) => ({
            ...prev,
            [course_level]: e.target.value,
        }));
    };

    const addTextPoint = () => {
        setFormData((prev) => ({
            ...prev,
            course_what_you_will_learn: [...prev.course_what_you_will_learn, ""],
        }));
    };

    const removeTextPoint = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            course_what_you_will_learn: prev.course_what_you_will_learn.filter((_, i) => i !== index),
        }));
    };

    const handleInputChangePoints = (index: number, value: string) => {
        setFormData((prev) => {
            const updatedPoints = [...prev.course_what_you_will_learn];
            updatedPoints[index] = value;
            return { ...prev, course_what_you_will_learn: updatedPoints };
        });
    };

    // mark
    const [lectureOrder, setLectureOrder] = useState<number>(0);
    const [videoOrder, setVideoOrder] = useState<number>(1);

    const [lectures, setLectures] = useState<Lecture[]>([
        {
            lecture_id: nanoid(),
            course_id: formData.course_id,
            lecture_title: "",
            lecture_description: "",
            lecture_order: lectureOrder,
            lecture_total_no_hours: 0,
            creation: new Date,
            videos: [{
                video_id: nanoid(),
                lecture_id: '',
                video_title: "",
                video_url: "",
                video_order: videoOrder,
                video_total_no_of_hours: 0,
                creation: new Date
            }]
        }
    ]);

    const addLecture = () => {
        const order = lectureOrder + 1;
        setLectures([...lectures, {
            lecture_id: nanoid(),
            course_id: formData.course_id,
            lecture_title: "",
            lecture_description: "",
            lecture_order: lectureOrder,
            lecture_total_no_hours: 0,
            creation: new Date,
            videos: [
                {
                    video_id: nanoid(),
                    lecture_id: '',
                    video_title: "",
                    video_url: "",
                    video_order: videoOrder,
                    video_total_no_of_hours: 0,
                    creation: new Date
                }
            ]
        }]);
        setLectureOrder((prev) => prev + 1);
    };

    const addVideo = (lectureIndex: number) => {
        const newLectures = [...lectures];
        newLectures[lectureIndex].videos.push(
            {
                video_id: nanoid(),
                video_title: "",
                video_url: "",
                lecture_id: lectures[lectureIndex]['lecture_id'],
                video_order: videoOrder,
                video_total_no_of_hours: 0,
                creation: new Date
            }
        );
        setLectures(newLectures);
    };

    const handleInputChange = (lectureIndex: number, field: keyof Lecture, value: string) => {
        const newLectures = [...lectures];
        newLectures[lectureIndex][field] = value;
        setLectures(newLectures);
    };

    const handleTitleChange = async (lectureIndex: number, videoIndex: number, field: keyof Video, value: string) => {
        const newLectures = [...lectures];
        newLectures[lectureIndex].videos[videoIndex][field] = value;
        newLectures[lectureIndex].videos[videoIndex]['lecture_id'] = lectures[lectureIndex].lecture_id;
        newLectures[lectureIndex].videos[videoIndex]['video_order'] = videoIndex;
        setLectures(newLectures);
    };

    const [uploadProgress, setUploadProgress] = useState<[number, number, number] | null>(null);

    // const handleVideoChange = async (
    //     lectureIndex: number,
    //     videoIndex: number,
    //     field: string,
    //     file: File | undefined
    // ) => {
    //     if (!file) return;

    //     if (!file.type.startsWith("video/")) {
    //         alert("Please upload a valid video file.");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append("file", file);
    //     formData.append("upload_preset", "lmsupload");
    //     formData.append("folder", "LectureVideos");

    //     const xhr = new XMLHttpRequest();
    //     xhr.open("POST", "https://api.cloudinary.com/v1_1/dy8jwwm6j/upload", true);

    //     xhr.upload.onprogress = (event) => {
    //         if (event.lengthComputable) {
    //             const percentComplete = Math.round((event.loaded / event.total) * 100);
    //             setUploadProgress([percentComplete, lectureIndex, videoIndex]);
    //         }
    //     };

    //     xhr.onload = () => {
    //         if (xhr.status === 200) {
    //             const data = JSON.parse(xhr.responseText);
    //             if (data.secure_url) {
    //                 const newLectures = [...lectures];
    //                 newLectures[lectureIndex].videos[videoIndex][field] = data.secure_url;
    //                 newLectures[lectureIndex].videos[videoIndex]["lecture_id"] = lectures[lectureIndex].lecture_id;
    //                 newLectures[lectureIndex].videos[videoIndex]["video_order"] = videoIndex;
    //                 newLectures[lectureIndex].videos[videoIndex]["video_total_no_of_hours"] = 0;
    //                 setLectures(newLectures);
    //                 console.log("Video uploaded:", data.secure_url);
    //             }
    //         } else {
    //             console.error("Error uploading video:", xhr.statusText);
    //             alert("Error uploading video. Please try again.");
    //         }
    //         setUploadProgress(null); // Reset after completion
    //     };

    //     xhr.onerror = () => {
    //         console.error("Network error occurred.");
    //         alert("Network error. Please try again.");
    //         setUploadProgress(null);
    //     };

    //     xhr.send(formData);
    // };

    const handleVideoChange = async (
        lectureIndex: number,
        videoIndex: number,
        field: string,
        file: File | undefined
    ) => {
        if (!file) return;

        if (!file.type.startsWith("video/")) {
            alert("Please upload a valid video file.");
            return;
        }

        const videoElement = document.createElement("video");
        videoElement.preload = "metadata";
        videoElement.src = URL.createObjectURL(file);

        videoElement.onloadedmetadata = async () => {
            window.URL.revokeObjectURL(videoElement.src);
            const duration = videoElement.duration;
            console.log("Video Duration:", duration);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "lmsupload");
            formData.append("folder", "LectureVideos");

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "https://api.cloudinary.com/v1_1/dy8jwwm6j/upload", true);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentComplete = Math.round((event.loaded / event.total) * 100);
                    setUploadProgress([percentComplete, lectureIndex, videoIndex]);
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    if (data.secure_url) {
                        const newLectures = [...lectures];
                        newLectures[lectureIndex].videos[videoIndex][field] = data.secure_url;
                        newLectures[lectureIndex].videos[videoIndex]["lecture_id"] = lectures[lectureIndex].lecture_id;
                        newLectures[lectureIndex].videos[videoIndex]["video_order"] = videoIndex;
                        newLectures[lectureIndex].videos[videoIndex]["video_total_no_of_hours"] = duration;
                        newLectures[lectureIndex].lecture_total_no_hours =
                            (newLectures[lectureIndex].lecture_total_no_hours || 0) + duration;
                        setLectures(newLectures);
                        console.log("Video uploaded:", data.secure_url);
                    }
                } else {
                    console.error("Error uploading video:", xhr.statusText);
                    alert("Error uploading video. Please try again.");
                }
                setUploadProgress(null);
            };

            xhr.onerror = () => {
                console.error("Network error occurred.");
                alert("Network error. Please try again.");
                setUploadProgress(null);
            };

            xhr.send(formData);
        };
    };

    const removeLecture = (lectureIndex: number) => {
        setLectures((prevLectures) => prevLectures.filter((_, index) => index !== lectureIndex));
    };

    const removeVideo = (lectureIndex: number, videoIndex: number) => {
        setLectures((prevLectures) => {
            const updatedLectures = [...prevLectures];
            updatedLectures[lectureIndex].videos = updatedLectures[lectureIndex].videos.filter((_, index) => index !== videoIndex);
            return updatedLectures;
        });
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
                                    src="https://www.payoja.org/wp-content/plugins/tutor/assets/images/placeholder.svg"
                                    alt="Placeholder Thumbnail"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .gif, .png"
                            onChange={handleImageUpload}
                            className="w-full p-2 rounded mt-2"
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

            {step === 2 && <div>
                <div className="mt-[-1rem]">
                    <div className="flex justify-center items-center text-gray-500 p-4">
                        <div className="w-[60rem] bg-slate-700 border border-transparent rounded-xl p-4">
                            <div className="text-white text-lg font-bold mb-2">Curriculum</div>
                            <hr className="bg-white mb-4" />
                            {lectures.map((lecture, lectureIndex) => (
                                <div key={lectureIndex} className="border border-gray-400 p-4 mb-4 rounded-md">
                                    <div className="flex items-center mb-2">
                                        <div className="text-white mr-2 font-bold">Lecture {lectureIndex + 1} :</div>
                                        <button
                                            onClick={() => removeLecture(lectureIndex)}
                                            className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md text-sm flex items-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 448 512" fill="currentColor">
                                                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                            </svg>
                                        </button>
                                        <input
                                            type="text"
                                            placeholder="Enter Lecture Title"
                                            className="ml-2 border border-transparent rounded-lg px-3 py-2 bg-gray-800 text-white focus:outline-none focus:ring-transparent w-full sm:w-3/4"
                                            value={lecture.lecture_title}
                                            onChange={(e) => handleInputChange(lectureIndex, "lecture_title", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Enter Lecture Description"
                                            className="ml-2 border border-transparent rounded-lg px-3 py-2 bg-gray-800 text-white focus:outline-none focus:ring-transparent w-full sm:w-3/4"
                                            value={lecture.lecture_description}
                                            onChange={(e) => handleInputChange(lectureIndex, "lecture_description", e.target.value)}
                                        />
                                    </div>


                                    <div className="border border-white p-2 mt-4 rounded-md">
                                        {lecture.videos.map((video, videoIndex) => (
                                            <div key={videoIndex} className="mb-2">
                                                <div className="flex items-center mb-2">
                                                    <div className="text-white mr-2">Video {videoIndex + 1} :</div>
                                                    <button
                                                        onClick={() => removeVideo(lectureIndex, videoIndex)}
                                                        className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md text-sm flex items-center"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 448 512" fill="currentColor">
                                                            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                                        </svg>
                                                    </button>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Video Title"
                                                        className="ml-2 border border-transparent rounded-lg px-3 py-2 bg-gray-800 text-white focus:outline-none focus:ring-transparent w-full sm:w-3/4"
                                                        value={video.video_title}
                                                        onChange={(e) => handleTitleChange(lectureIndex, videoIndex, "video_title", e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        type="file"
                                                        className="ml-2 border border-transparent rounded-lg px-3 py-2 bg-gray-800 text-white focus:outline-none focus:ring-transparent w-full sm:w-3/4"
                                                        onChange={(e) => handleVideoChange(lectureIndex, videoIndex, "video_url", e.target.files[0])}
                                                    />

                                                    {uploadProgress !== null && uploadProgress[1] === lectureIndex && uploadProgress[2] === videoIndex && (
                                                        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                                                            <div
                                                                className="bg-blue-500 h-4 text-xs text-white text-center rounded-full"
                                                                style={{ width: `${uploadProgress[0]}%` }}
                                                            >
                                                                {uploadProgress[0]}%
                                                            </div>
                                                        </div>
                                                    )}


                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            onClick={() => addVideo(lectureIndex)}
                                            className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md text-sm"
                                        >
                                            + Add Video
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={addLecture}
                                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                            >
                                + Add Lecture
                            </button>
                        </div>
                    </div>
                </div>
            </div>}

            {step === 3 && (
                <div>
                    <label className="block mt-4 mb-2">Course Price</label>
                    <input
                        name="course_price"
                        value={formData.course_price}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 rounded"
                        placeholder="Enter price"
                        type="number"
                    />

                    <label className="block mt-4 mb-2">Course Level</label>
                    <select
                        name="course_level"
                        value={course_level} // Bind the value to the course_level state
                        onChange={handleChangeLevel} // Handle value change
                        className="w-full p-2 bg-gray-800 rounded"
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
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
                            {formData.course_what_you_will_learn.map((point, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        className="p-2 w-full bg-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                        placeholder={`Text Point ${index + 1}`}
                                        value={point}
                                        onChange={(e) => handleInputChangePoints(index, e.target.value)}
                                    />
                                    {/* Delete Button */}
                                    {formData.course_what_you_will_learn.length > 1 && (
                                        <button
                                            onClick={() => removeTextPoint(index)}
                                            className="text-white focus:outline-none"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
                                                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                            </svg>
                                        </button>
                                    )}
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

            <ToastContainer />
            <div className="flex justify-between mt-6">
                {step > 1 && <button onClick={prevStep} className="px-4 py-2 bg-gray-700 rounded">Previous</button>}
                {step < 3 ? (
                    <button onClick={nextStep} className="px-4 py-2 bg-purple-500 rounded">Next</button>
                ) : (
                    <button onClick={async (e) => {
                        e.preventDefault();
                        try {
                            console.log(formData);
                            console.log(lectures);
                            const response = await axios.post(
                                `${import.meta.env.VITE_BASE_URL}/teachers/course/upload`,
                                formData,
                                {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem('teacher_token')}`
                                    }
                                }
                            );
                            await Promise.all(lectures.map(async (lecture) => {
                                try {
                                    const response = await axios.post(
                                        `${import.meta.env.VITE_BASE_URL}/teachers/lecture/upload`,
                                        lecture,
                                        {
                                            headers: { Authorization: `Bearer ${localStorage.getItem('teacher_token')}` }
                                        }
                                    );
                                    console.log(response);

                                    await Promise.all(lecture.videos.map(async (video) => {
                                        try {
                                            const videoResponse = await axios.post(
                                                `${import.meta.env.VITE_BASE_URL}/teachers/video/upload`,
                                                video,
                                                {
                                                    headers: { Authorization: `Bearer ${localStorage.getItem('teacher_token')}` }
                                                }
                                            );
                                            console.log(videoResponse);
                                        } catch (err) {
                                            console.error('Failed to upload video:', err.response?.data || err.message);
                                        }
                                    }));
                                } catch (err) {
                                    console.error('Failed to upload lecture:', err.response?.data || err.message);
                                }
                            }));
                            notify();
                        } catch (err) {
                            console.error('Failed to upload course :', err.response?.data || err.message);
                        }
                    }
                    } className="px-4 py-2 bg-green-500 rounded">Submit</button>
                )}
            </div>

        </div>
    );
};

export default CourseUpload;
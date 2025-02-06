import { useState } from "react";

export default function CurriculumUploader() {
    const [lectures, setLectures] = useState([
        {
            lectureTitle: "",
            lectureDescription: "",
            videos: [{ videoTitle: "", videoFile: "" }]
        }
    ]);

    // Function to add a new lecture
    const addLecture = () => {
        setLectures([...lectures, { lectureTitle: "", lectureDescription: "", videos: [{ videoTitle: "", videoFile: "" }] }]);
    };

    // Function to add a new video within a lecture
    const addVideo = (lectureIndex) => {
        const newLectures = [...lectures];
        newLectures[lectureIndex].videos.push({ videoTitle: "", videoFile: "" });
        setLectures(newLectures);
    };

    // Function to handle input changes
    const handleInputChange = (lectureIndex, field, value) => {
        const newLectures = [...lectures];
        newLectures[lectureIndex][field] = value;
        setLectures(newLectures);
    };

    // Function to handle video input changes
    const handleVideoChange = (lectureIndex, videoIndex, field, value) => {
        const newLectures = [...lectures];
        newLectures[lectureIndex].videos[videoIndex][field] = value;
        setLectures(newLectures);
    };

    return (
        <div className="flex justify-center items-center text-gray-500 p-4">
            <div className="w-[60rem] bg-slate-700 border border-transparent rounded-xl p-4">
                <div className="text-white text-lg font-bold mb-2">Curriculum</div>
                <hr className="bg-white mb-4" />

                {lectures.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className="border border-red-400 p-4 mb-4 rounded-md">
                        <div className="flex items-center mb-2">
                            <div className="text-white mr-2">Lecture {lectureIndex + 1} :</div>
                            <input
                                type="text"
                                placeholder="Enter Lecture Title"
                                className="ml-2 border border-purple-400 rounded-md px-2 py-1"
                                value={lecture.lectureTitle}
                                onChange={(e) => handleInputChange(lectureIndex, "lectureTitle", e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Enter Lecture Description"
                                className="ml-2 border border-purple-400 rounded-md px-2 py-1 w-full"
                                value={lecture.lectureDescription}
                                onChange={(e) => handleInputChange(lectureIndex, "lectureDescription", e.target.value)}
                            />
                        </div>

                        {/* Videos Section */}
                        <div className="border border-purple-400 p-2 mt-4 rounded-md">
                            {lecture.videos.map((video, videoIndex) => (
                                <div key={videoIndex} className="mb-2">
                                    <div className="flex items-center mb-2">
                                        <div className="text-white mr-2">Video {videoIndex + 1} :</div>
                                        <input
                                            type="text"
                                            placeholder="Enter Video Title"
                                            className="ml-2 border border-purple-400 rounded-md px-2 py-1"
                                            value={video.videoTitle}
                                            onChange={(e) => handleVideoChange(lectureIndex, videoIndex, "videoTitle", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="file"
                                            className="ml-2 border border-purple-400 rounded-md px-2 py-1 w-full"
                                            onChange={(e) => handleVideoChange(lectureIndex, videoIndex, "videoFile", e.target.files[0])}
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* Add Video Button */}
                            <button
                                onClick={() => addVideo(lectureIndex)}
                                className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md text-sm"
                            >
                                + Add Video
                            </button>
                        </div>
                    </div>
                ))}

                {/* Add Lecture Button */}
                <button
                    onClick={addLecture}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                >
                    + Add Lecture
                </button>
            </div>
        </div>
    );
}

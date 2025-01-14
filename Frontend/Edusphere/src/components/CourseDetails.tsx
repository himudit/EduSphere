import React from "react";
import { useParams } from "react-router-dom";

function CourseDetails() {
    const { courseName } = useParams<{ courseName?: string }>();

    // Safely handle undefined or missing courseName
    const formattedCourseName = courseName
        ? courseName.replace(/-/g, " ") // Convert back to spaces
        : "Unknown Course";

    return (
        <div>
            <h1>Course: {formattedCourseName}</h1>
            <p>Course content and details will be displayed here.</p>
        </div>
    );
}

export default CourseDetails;

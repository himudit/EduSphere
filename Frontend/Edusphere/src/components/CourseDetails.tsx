import React, { useState } from 'react';

const CourseDetails = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [expandedSection, setExpandedSection] = useState<string | null>('01');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Course sections data
    const courseSections = [
        {
            id: '01',
            title: 'Intro',
            duration: '22min',
            lessons: [
                { title: 'Introduction', duration: '2 min' },
                { title: 'What is Figma?', duration: '5 min' },
                { title: 'Understanding Figma', duration: '12 min' },
                { title: 'UI tour', duration: '3 min' },
            ],
        },
        {
            id: '02',
            title: 'Intermediate Level Stuff',
            duration: '1h 20min',
            lessons: [
                { title: 'Advanced Features', duration: '25 min' },
                { title: 'Working with Components', duration: '30 min' },
                { title: 'Layouts and Grids', duration: '25 min' },
            ],
        },
        {
            id: '03',
            title: 'Advanced Stuff',
            duration: '35min',
            lessons: [
                { title: 'Advanced Techniques', duration: '15 min' },
                { title: 'Professional Workflows', duration: '20 min' },
            ],
        },
        {
            id: '04',
            title: 'Imports & Graphics',
            duration: '40min',
            lessons: [
                { title: 'Importing Assets', duration: '20 min' },
                { title: 'Working with Graphics', duration: '20 min' },
            ],
        },
    ];

    const learningPoints = [
        'Setting up the environment',
        'Advanced HTML Practices',
        'Build a portfolio website',
        'Understand HTML Programming',
        'Good HTML',
        'Start building beautiful websites',
    ];

    const toggleSection = (sectionId: string) => {
        setExpandedSection(expandedSection === sectionId ? null : sectionId);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-purple-400">
            {/* Main Content */}
            <div className="w-full lg:w-[65%] bg-black p-4 overflow-y-auto">
                {/* Header Section */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <button onClick={() => { }} className="hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <span>Figma from A to Z</span>
                    <span className="text-gray-400">• UI/UX Design</span>
                </div>

                {/* Course Stats */}
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        <span>38 lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>4h 30min</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>4.5 (2K reviews)</span>
                    </div>
                </div>

                {/* Video Preview */}
                <div className="relative aspect-video bg-gray-100 rounded-lg mb-8 overflow-hidden">
                    <img
                        // src="https://images.unsplash.com/photo-1593697821028-7cc59cfd7399?ixlib=rb-4.0.3"
                        alt="Course preview"
                        className="w-full h-full object-cover"
                    />
                    <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-opacity">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </button>
                </div>

                {/* Navigation Tabs */}
                {/* <div className="flex border-b mb-6 overflow-x-auto">
                    {['Overview', 'Author', 'FAQ', 'Announcements', 'Reviews'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            className={`px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap ${activeTab === tab.toLowerCase()
                                    ? 'text-purple-600 border-b-2 border-purple-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div> */}

                {/* Course Content */}
                <div className="mb-8">
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">About Course</h2>
                        <p className="text-gray-600 mb-4">
                            Unlock the power of Figma, the leading collaborative design tool, with our comprehensive online course.
                            Whether you're a novice or looking to enhance your skills, this course will guide you through Figma's robust
                            features and workflows.
                        </p>
                        <p className="text-gray-600">
                            Perfect for UI/UX designers, product managers, and anyone interested in modern design tools. Join us to elevate
                            your design skills and boost your productivity with Figma!
                        </p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {learningPoints.map((point, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-600">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Hamburger Button */}
            <button
                onClick={toggleSidebar}
                className="fixed right-4 top-4 lg:hidden z-50 bg-purple-600 text-white p-2 rounded-lg shadow-lg"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                </svg>
            </button>

            {/* Course Content Sidebar */}
            <div
                className={`fixed lg:static lg:block w-full lg:w-[35%] h-full bg-black overflow-y-auto transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
                    } top-0 right-0 z-40`}
            >
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Course content</h2>
                    <div className="space-y-2">
                        {courseSections.map((section) => (
                            <div key={section.id} className="border rounded-lg bg-purple-400 overflow-hidden">
                                <button
                                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                                    onClick={() => toggleSection(section.id)}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">{section.id}. {section.title}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-500">{section.duration}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-5 w-5 transition-transform ${expandedSection === section.id ? 'transform rotate-180' : ''
                                                }`}
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </button>
                                {expandedSection === section.id && section.lessons && (
                                    <div className="border-t">
                                        {section.lessons.map((lesson, index) => (
                                            <div
                                                key={index}
                                                className="px-4 py-2 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-sm text-gray-600">{lesson.title}</span>
                                                </div>
                                                <span className="text-sm text-gray-500">{lesson.duration}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {/* </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails; */}
                    </div>

                    {/* Author Section */}
                    <div className="mt-8 border-t pt-6">
                        <h2 className="text-lg font-semibold mb-4">Publisher</h2>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex items-start gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1"
                                    alt="Ryan Curtis"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-medium text-gray-900">Ryan Curtis</h3>
                                        <span className="text-sm text-gray-500">3D Artist</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Hey! My name is Ryan. I'm 26 and I'm a freelance 3D Artist with around 5 years of experience.
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="text-sm text-gray-600">4.8 Instructor rating</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                            </svg>
                                            <span className="text-sm text-gray-600">889 Reviews</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                            </svg>
                                            <span className="text-sm text-gray-600">4,887 Students</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm text-gray-600">6 Courses</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
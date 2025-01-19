import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CardDisplay from './CardDisplay';

// Define interfaces for better type safety
interface Course {
    course_id: string;
    course_title: string;
    course_description: string;
    course_price: number;
    course_thumbnail: string;
    course_no_of_purchase: number;
    course_total_no_hours: number;
    rating: number;
    creation: string;
    course_author: string;
    course_what_you_will_learn: string[];
    course_keywords: string[];
    course_preview_video: string;
}

interface FilterItem {
    label: string;
    count: string;
}

interface FilterGroupProps {
    title: string;
    items: FilterItem[];
    type: 'radio' | 'checkbox';
    selected?: string | string[];
    setSelected: (value: any) => void;
}

const Search: React.FC = () => {
    const navigate = useNavigate();

    // State management for filters and course data
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [courseData, setCourseData] = useState<Course[]>([]); // Fixed type to Course[]
    const [rating, setRating] = useState<string>("");
    const [duration, setDuration] = useState<string>("");
    const [topic, setTopic] = useState<string[]>([]);
    const [level, setLevel] = useState<string>("");

    // Fetch courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get<Course[]>(`${import.meta.env.VITE_BASE_URL}/search`);
                setCourseData(response.data);
            } catch (err) {
                console.error('Error fetching courses:', err);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex">
                    {/* Desktop Left Sidebar Filters */}
                    <div className="hidden ml-1 mt-1 lg:block w-64 shrink-0 border border-[#212529] rounded-lg min-h-screen bg-[#161a1d]">
                        <div className="top-0 p-6 space-y-8">
                            <h2 className="text-lg font-semibold text-white">Filters</h2>

                            <div className="space-y-6">
                                {/* Rating Filter */}
                                <FilterGroup
                                    title="Ratings"
                                    items={[
                                        { label: '4.5 & up', count: '10,000+' },
                                        { label: '4.0 & up', count: '15,000+' },
                                        { label: '3.5 & up', count: '20,000+' },
                                        { label: '3.0 & up', count: '25,000+' }
                                    ]}
                                    type="radio"
                                    selected={rating}
                                    setSelected={setRating}
                                />

                                {/* Duration Filter */}
                                <FilterGroup
                                    title="Video Duration"
                                    items={[
                                        { label: '0-1 Hour', count: '1,473' },
                                        { label: '1-3 Hours', count: '2,286' },
                                        { label: '3-6 Hours', count: '3,549' },
                                        { label: '6-17 Hours', count: '5,058' }
                                    ]}
                                    type="radio"
                                    selected={duration}
                                    setSelected={setDuration}
                                />

                                {/* Topic Filter */}
                                <FilterGroup
                                    title="Topic"
                                    items={[
                                        { label: 'Python', count: '586' },
                                        { label: 'JavaScript', count: '508' },
                                        { label: 'React.js', count: '486' },
                                        { label: 'Web Development', count: '379' }
                                    ]}
                                    type="checkbox"
                                    selected={topic}
                                    setSelected={setTopic}
                                />

                                {/* Level Filter */}
                                <FilterGroup
                                    title="Level"
                                    items={[
                                        { label: 'Beginner', count: '5,749' },
                                        { label: 'Intermediate', count: '3,678' },
                                        { label: 'Advanced', count: '1,893' }
                                    ]}
                                    type="radio"
                                    selected={level}
                                    setSelected={setLevel}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {/* Mobile Filter Button */}
                        <div className="sticky top-0 z-50 bg-[#161a1d] shadow-sm lg:hidden">
                            <div className="px-4 py-4">
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                    </svg>
                                    Filters
                                </button>
                            </div>
                        </div>

                        {/* Course Cards Grid */}
                        <div className="p-4 sm:p-6 lg:p-8">
                            <div className="grid grid-cols-1 gap-6">
                                {courseData.map((item, index) => (
                                    <div
                                        key={item.course_id}
                                        onClick={() => navigate(`/course/${item.course_id}`)}
                                        className="cursor-pointer"
                                    >
                                        <CardDisplay
                                            image={item.course_thumbnail}
                                            creation={item.creation}
                                            title={item.course_title}
                                            tags={item.course_keywords}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Filter Slide-over */}
            <div
                className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity lg:hidden ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsFilterOpen(false)}
            >
                <div
                    className={`fixed inset-y-0 left-0 max-w-xs w-full bg-[#161a1d] shadow-xl transform transition-transform ease-in-out duration-300 ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="h-full flex flex-col">
                        {/* Mobile Filter Header */}
                        <div className="px-4 py-6 bg-gradient-to-r from-purple-700 to-purple-400">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-medium text-white">Filters</h2>
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="text-white hover:text-gray-200 transition-colors"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Filter Content */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="space-y-6">
                                <FilterGroup
                                    title="Ratings"
                                    items={[
                                        { label: '4.5 & up', count: '10,000+' },
                                        { label: '4.0 & up', count: '15,000+' },
                                        { label: '3.5 & up', count: '20,000+' },
                                        { label: '3.0 & up', count: '25,000+' }
                                    ]}
                                    type="radio"
                                    selected={rating}
                                    setSelected={setRating}
                                />
                                {/* Duration Filter */}
                                <FilterGroup
                                    title="Video Duration"
                                    items={[
                                        { label: '0-1 Hour', count: '1,473' },
                                        { label: '1-3 Hours', count: '2,286' },
                                        { label: '3-6 Hours', count: '3,549' },
                                        { label: '6-17 Hours', count: '5,058' }
                                    ]}
                                    type="radio"
                                    selected={duration}
                                    setSelected={setDuration}
                                />

                                {/* Topic Filter */}
                                <FilterGroup
                                    title="Topic"
                                    items={[
                                        { label: 'Python', count: '586' },
                                        { label: 'JavaScript', count: '508' },
                                        { label: 'React.js', count: '486' },
                                        { label: 'Web Development', count: '379' }
                                    ]}
                                    type="checkbox"
                                    selected={topic}
                                    setSelected={setTopic}
                                />

                                {/* Level Filter */}
                                <FilterGroup
                                    title="Level"
                                    items={[
                                        { label: 'Beginner', count: '5,749' },
                                        { label: 'Intermediate', count: '3,678' },
                                        { label: 'Advanced', count: '1,893' }
                                    ]}
                                    type="radio"
                                    selected={level}
                                    setSelected={setLevel}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// FilterGroup Component
const FilterGroup: React.FC<FilterGroupProps> = ({ title, items, type, selected, setSelected }) => {
    const handleSelect = (label: string) => {
        if (type === 'radio') {
            setSelected(label);
        } else if (type === 'checkbox') {
            setSelected((prev: string[]) => {
                if (prev.includes(label)) {
                    return prev.filter(item => item !== label);
                }
                return [...prev, label];
            });
        }
    };

    return (
        <div className="border-b border-[#4a5661] pb-6 last:border-b-0">
            <button className="w-full flex items-center justify-between text-sm font-medium text-white">
                <span className="text-base font-semibold">{title}</span>
            </button>

            <div className="mt-4 space-y-3">
                {items.map((item, index) => (
                    <label key={index} className="flex items-center group cursor-pointer">
                        <input
                            type={type}
                            name={title}
                            checked={type === 'radio'
                                ? selected === item.label
                                : (selected as string[])?.includes(item.label)}
                            onChange={() => handleSelect(item.label)}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
                        />
                        <span className="ml-3 text-sm text-white group-hover:text-gray-200 transition-colors">
                            {item.label}
                        </span>
                        <span className="ml-auto text-xs text-white">({item.count})</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Search;
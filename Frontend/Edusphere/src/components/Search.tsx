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
}

interface FilterGroupProps {
    title: string;
    items: FilterItem[];
    type: 'radio' | 'checkbox';
    selected: string | string[];
    setSelected: (value: string | string[]) => void;
    name: string;
}

const Search: React.FC = () => {
    const navigate = useNavigate();

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [courseData, setCourseData] = useState<Course[]>([]);
    const [rating, setRating] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [topic, setTopic] = useState<string[]>([]);
    const [level, setLevel] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const query = new URLSearchParams(location.search).get("q");

    // useEffect(() => {
    //     if (!query || query.trim() === "") return;

    //     const fetchCourses = async () => {
    //         try {
    //             const res = await axios.get<Course[]>(`${import.meta.env.VITE_BASE_URL}/search?query=${query}`);
    //             setCourseData(res.data);
    //         } catch (err: any) {
    //             console.error('Error fetching courses:', err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchCourses();
    // }, [query]);


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get<Course[]>(`${import.meta.env.VITE_BASE_URL}/v2/search`);
                setCourseData(response.data);
            } catch (err) {
                console.error('Error fetching courses:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        const fetchFilteredCourses = async () => {
            try {
                const response = await axios.get<Course[]>(
                    `${import.meta.env.VITE_BASE_URL}/filterSearch`,
                    {
                        params: {
                            topic: topic,
                            level,
                            rating
                        }
                    }
                );
                setCourseData(response.data);
            } catch (err) {
                console.error('Error fetching courses:', err);
            }
        };
        fetchFilteredCourses();
    }, [topic, level, rating]);

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex">
                    {/* Desktop Left Sidebar Filters */}
                    <div className="hidden ml-1 mt-1 lg:block w-64 shrink-0 border border-[#212529] rounded-lg min-h-screen bg-[#161a1d]">
                        <div className=" top-0 p-6 space-y-8">
                            <h2 className="text-lg font-semibold text-white">Filters</h2>

                            <div className="space-y-6">
                                {/* Rating Filter */}
                                <FilterGroup
                                    title="Ratings"
                                    name="rating"
                                    items={[
                                        { label: '4.5 & up' },
                                        { label: '3.0 & up' },
                                        { label: '2.5 & below' },
                                    ]}
                                    type="radio"
                                    selected={rating}
                                    setSelected={(value) => setRating(value as string)}
                                />

                                {/* Duration Filter */}

                                {/* Topic Filter */}
                                <FilterGroup
                                    title="Topic"
                                    name="topic"
                                    items={[
                                        { label: 'Python' },
                                        { label: 'JavaScript' },
                                        { label: 'React' },
                                        { label: 'Web Development' },
                                        { label: 'Frontend' },
                                        { label: 'AI' }
                                    ]}
                                    type="checkbox"
                                    selected={topic}
                                    setSelected={(value) => setTopic(value as string[])}
                                />

                                {/* Level Filter */}
                                <FilterGroup
                                    title="Level"
                                    name="level"
                                    items={[
                                        { label: 'Beginner' },
                                        { label: 'Intermediate' },
                                        { label: 'Advanced' }
                                    ]}
                                    type="radio"
                                    selected={level}
                                    setSelected={(value) => setLevel(value as string)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {/* Mobile Filter Button */}
                        <div className="top-0 z-50 bg-[#161a1d] shadow-sm lg:hidden">
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
                        {
                            loading ?
                                <>
                                    <div className="flex flex-wrap gap-6 justify-center">
                                        {Array(5).fill(null).map((_, index) => (
                                            <div
                                                key={index}
                                                className={`bg-gray-300 animate-pulse rounded-xl overflow-hidden shadow-lg 
          ${isDesktop ? "w-[770px] h-[190px] flex -ml-[10rem]" : "w-full max-w-sm flex flex-col h-auto"}`}
                                            >
                                                {/* Image Placeholder */}
                                                <div className={`${isDesktop ? "w-1/3 h-auto" : "w-full h-[200px]"} bg-gray-400 animate-pulse`} />

                                                {/* Content Placeholder */}
                                                <div className={`${isDesktop ? "w-2/3 p-4 space-y-3" : "w-full p-4 space-y-3"}`}>
                                                    <div className="w-32 h-4 bg-gray-400 rounded" /> {/* Date */}
                                                    <div className={`${isDesktop ? "w-[25rem] h-10" : "w-full h-10"} bg-gray-500 rounded`} /> {/* Title */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {Array(4).fill(null).map((_, i) => (
                                                            <div key={i} className="w-20 mt-5 h-10 bg-gray-400 rounded-2xl" />
                                                        ))}
                                                    </div>
                                                    {/* <div className="w-20 h-4 bg-gray-400 rounded mt-3" /> View More */}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </> :
                                <>
                                    <div className="p-4 sm:p-6 lg:p-8">
                                        <div className="grid grid-cols-1 gap-6">
                                            {courseData.map((item) => (
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
                                </>
                        }

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
                                    name="rating-mobile"
                                    items={[
                                        { label: '4.5 & up' },
                                        { label: '3.0 & up' },
                                        { label: '2.5 & below' },
                                    ]}
                                    type="radio"
                                    selected={rating}
                                    setSelected={(value) => setRating(value as string)}
                                />
                                <FilterGroup
                                    title="Topic"
                                    name="topic"
                                    items={[
                                        { label: 'Python' },
                                        { label: 'JavaScript' },
                                        { label: 'React' },
                                        { label: 'Web Development' },
                                        { label: 'Frontend' },
                                        { label: 'AI' }
                                    ]}
                                    type="checkbox"
                                    selected={topic}
                                    setSelected={(value) => setTopic(value as string[])}
                                />

                                {/* Level Filter */}
                                <FilterGroup
                                    title="Level"
                                    name="level"
                                    items={[
                                        { label: 'Beginner' },
                                        { label: 'Intermediate' },
                                        { label: 'Advanced' }
                                    ]}
                                    type="radio"
                                    selected={level}
                                    setSelected={(value) => setLevel(value as string)}
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
const FilterGroup: React.FC<FilterGroupProps> = ({ title, items, type, selected, setSelected, name }) => {
    const handleSelect = (label: string) => {
        if (type === 'radio') {
            setSelected(label);
        } else if (type === 'checkbox') {
            const currentSelected = selected as string[];
            if (currentSelected.includes(label)) {
                setSelected(currentSelected.filter(item => item !== label));
            } else {
                setSelected([...currentSelected, label]);
            }
        }
        // console.log(selected);
    };

    return (
        <div className="border-b border-[#4a5661] pb-6 last:border-b-0">
            <div className="w-full flex items-center justify-between text-sm font-medium text-white">
                <span className="text-base font-semibold">{title}</span>
            </div>

            <div className="mt-4 space-y-3">
                {items.map((item, index) => (
                    <label key={index} className="flex items-center group cursor-pointer">
                        <input
                            type={type}
                            name={name}
                            value={item.label}
                            checked={type === 'radio'
                                ? selected === item.label
                                : (selected as string[]).includes(item.label)}
                            onChange={() => handleSelect(item.label)}
                            className={`h-4 w-4 text-purple-600 focus:ring-purple-500 ${type === 'radio' ? 'rounded-full' : 'rounded'}`}
                        />
                        <span className="ml-3 text-sm text-white group-hover:text-gray-200 transition-colors">
                            {item.label}
                        </span>
                        {/* <span className="ml-auto text-xs text-white">({item.count})</span> */}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Search;
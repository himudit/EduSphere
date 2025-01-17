import React, { useState } from 'react';

const Search: React.FC = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto ">
                <div className="flex">
                    {/* Desktop Left Sidebar Filters */}
                    <div className="hidden ml-1 mt-1 lg:block w-64 shrink-0 border border-[#212529] rounded-lg min-h-screen bg-[#212529]">
                        <div className="top-0 p-6 space-y-8">
                            <h2 className="text-lg font-semibold text-white">Filters</h2>

                            <div className="space-y-6">
                                <FilterGroup title="Ratings" items={[
                                    { label: '4.5 & up', count: '10,000+' },
                                    { label: '4.0 & up', count: '15,000+' },
                                    { label: '3.5 & up', count: '20,000+' },
                                    { label: '3.0 & up', count: '25,000+' }
                                ]} />

                                <FilterGroup title="Video Duration" items={[
                                    { label: '0-1 Hour', count: '1,473' },
                                    { label: '1-3 Hours', count: '2,286' },
                                    { label: '3-6 Hours', count: '3,549' },
                                    { label: '6-17 Hours', count: '5,058' }
                                ]} />

                                <FilterGroup title="Topic" items={[
                                    { label: 'Python', count: '586' },
                                    { label: 'JavaScript', count: '508' },
                                    { label: 'React.js', count: '486' },
                                    { label: 'Web Development', count: '379' }
                                ]} />

                                <FilterGroup title="Level" items={[
                                    { label: 'Beginner', count: '5,749' },
                                    { label: 'Intermediate', count: '3,678' },
                                    { label: 'Advanced', count: '1,893' }
                                ]} />
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Mobile Filter Button */}
                        <div className="top-0 z-50 bg-white shadow-sm lg:hidden">
                            <div className="px-4 py-4">
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md  text-white bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="bg-white h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                    </svg>
                                    Filters
                                </button>
                            </div>
                        </div>

                        {/* Course Cards Grid */}
                        <div className="p-4 sm:p-6 lg:p-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Course cards will be mapped here */}
                                {/* Example card structure in comments */}
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
                    className={`fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl transform transition-transform ease-in-out duration-300 ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="h-full flex flex-col">
                        <div className="px-4 py-6 bg-purple-400">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-medium text-white">Filters</h2>
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="text-white hover:text-white"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="space-y-6">
                                <FilterGroup title="Ratings" items={[
                                    { label: '4.5 & up', count: '10,000+' },
                                    { label: '4.0 & up', count: '15,000+' },
                                    { label: '3.5 & up', count: '20,000+' },
                                    { label: '3.0 & up', count: '25,000+' }
                                ]} />
                                <FilterGroup title="Video Duration" items={[
                                    { label: '0-1 Hour', count: '1,473' },
                                    { label: '1-3 Hours', count: '2,286' },
                                    { label: '3-6 Hours', count: '3,549' },
                                    { label: '6-17 Hours', count: '5,058' }
                                ]} />
                                <FilterGroup title="Topic" items={[
                                    { label: 'Python', count: '586' },
                                    { label: 'JavaScript', count: '508' },
                                    { label: 'React.js', count: '486' },
                                    { label: 'Web Development', count: '379' }
                                ]} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Filter Group Component (used for both desktop and mobile)
const FilterGroup: React.FC<{ title: string; items: { label: string; count: string }[] }> = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border-b border-gray-200 pb-6 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between text-sm font-medium text-white hover:text-gray-600"
            >
                <span className="text-base font-semibold">{title}</span>
                <svg
                    className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div className={`mt-4 space-y-3 ${isOpen ? 'block' : 'hidden'}`}>
                {items.map((item, index) => (
                    <label key={index} className="flex items-center group ">
                        <input
                            type="checkbox"
                            className=" h-4 w-4 text-purple-400 focus:ring-purple-500 rounded"
                        />
                        <span className="ml-3 text-sm text-white group-hover:text-white">{item.label}</span>
                        <span className="ml-auto text-xs text-white">({item.count})</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Search;
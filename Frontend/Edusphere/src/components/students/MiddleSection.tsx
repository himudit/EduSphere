import React from 'react'

const MiddleSection = () => {
  return (
    <>
      {/* Main Heading - Responsive */}
      <div className='flex flex-wrap justify-center items-center px-4'>
        <span className="text-4xl md:text-7xl lg:text-8xl text-gray-400 mb-4 md:mb-16 font-bold text-center">
          Learn
        </span>
        <span className="text-5xl md:text-8xl lg:text-9xl text-orange-400 font-bold text-center md:ml-4">
          Faster
        </span>
      </div>

      {/* Section Container - Responsive */}
      <section className="mx-auto py-8 md:py-20 bg-gray-500 text-white w-full md:w-4/5 lg:w-3/4 border border-transparent rounded-xl">
        <div className="px-4 md:px-12">
          <div className="mb-8">
            <span className='text-gray-400 text-lg md:text-2xl'>Description to</span>
            <br />
            <span className='text-black font-semibold text-xl md:text-3xl'>EduSphere</span>
            <p className="text-base md:text-lg mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, totam error quam nobis consequuntur fugiat odit.
            </p>
          </div>

          {/* Content Container */}
          <div className="flex flex-wrap gap-8">
            {/* Grid Container - Responsive */}
            <div className="w-full bg-gray-200 p-4 md:p-8 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Box 1 */}
                <div className="bg-gray-300 p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">Personalized Learning</h3>
                  <p className="text-gray-700 mt-2 text-sm md:text-base">
                    Tailored courses based on your progress and interests.
                  </p>
                </div>

                {/* Box 2 */}
                <div className="bg-gray-300 p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">Expert-Led Courses</h3>
                  <p className="text-gray-700 mt-2 text-sm md:text-base">
                    Learn from industry professionals with real-world experience.
                  </p>
                </div>

                {/* Box 3 */}
                <div className="bg-gray-300 p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">Interactive Learning</h3>
                  <p className="text-gray-700 mt-2 text-sm md:text-base">
                    Engage with quizzes, live sessions, and hands-on projects.
                  </p>
                </div>

                {/* Box 4 */}
                <div className="bg-gray-300 p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">24/7 Access</h3>
                  <p className="text-gray-700 mt-2 text-sm md:text-base">
                    Learn anytime, anywhere with full access to materials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MiddleSection
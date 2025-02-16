import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const MiddleSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const shipY = useTransform(scrollYProgress, [0, 0.6], [150, 0]);
  const shipOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const fasterY = useTransform(scrollYProgress, [0, 0.9], [-170, 0]);
  const fasterOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <div ref={containerRef} className="relative min-h-screen w-ful py-20">
      {/* Main Heading Section */}
      <div className="flex flex-col items-center justify-center px-4 pt-20">
        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <motion.span
            style={{ y: shipY, opacity: shipOpacity }}
            className="text-[8rem]  font-bold text-gray-300"
          >
            Ship
          </motion.span>
          <motion.span
            style={{ y: fasterY, opacity: fasterOpacity }}
            className="text-[8rem] font-bold text-[#ff4d4d]"
          >
            faster
          </motion.span>
        </div>
      </div>

      {/* Content Section */}
      {/* <div className="mx-auto mt-20 max-w-6xl px-4">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-8">
            <span className="text-gray-500 text-lg">Description to</span>
            <h2 className="text-3xl font-bold mt-2 flex items-center">
              Sitemap
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h2>
            <p className="mt-4 text-gray-600">
              The best way to start off your new project. Use AI to map out all your key pages with just a few sentences about your company. Effortlessly create a complete sitemap in mere seconds, not hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-6">
              <div className="mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Map out key content</h3>
              <p className="mt-2 text-gray-600">
                Specify the key pages and describe key content for each page category.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 p-6">
              <div className="mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 7H3M15 12H3M15 17H3M19 7L21 9L19 11M19 17V13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Control the flow edit</h3>
              <p className="mt-2 text-gray-600">
                Drag, edit, and re-organize sections to get the flow just right.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 p-6">
              <div className="mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Smart tagging</h3>
              <p className="mt-2 text-gray-600">
                Tag your sections to guide our AI to generate better results.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 p-6">
              <div className="mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Scope projects better</h3>
              <p className="mt-2 text-gray-600">
                Starting off with a sitemap improves the entire scope process.
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MiddleSection;
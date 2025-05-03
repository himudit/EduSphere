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
            Learn
          </motion.span>
          <motion.span
            style={{ y: fasterY, opacity: fasterOpacity }}
            className="text-[8rem] font-bold text-[#ff4d4d]"
          >
            faster
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default MiddleSection;
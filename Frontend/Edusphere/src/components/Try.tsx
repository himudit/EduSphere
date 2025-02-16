import { motion } from "framer-motion";

// Sample showcase items using Unsplash images
const showcaseItems1 = [
    { id: 1, image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop", alt: "Business website" },
    { id: 2, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop", alt: "Marketing website" },
    { id: 3, image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&auto=format&fit=crop", alt: "Portfolio site" },
    { id: 4, image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop", alt: "Corporate website" },
    { id: 5, image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop", alt: "Tech website" }
];

const showcaseItems2 = [
    { id: 6, image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop", alt: "Digital agency" },
    { id: 7, image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop", alt: "SaaS platform" },
    { id: 8, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop", alt: "Design agency" },
    { id: 9, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop", alt: "E-commerce" },
    { id: 10, image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&auto=format&fit=crop", alt: "Landing page" }
];

interface ShowcaseItem {
    id: number;
    image: string;
    alt: string;
}

interface ShowcaseRowProps {
    items: ShowcaseItem[];
    direction: "left" | "right";
}

const ShowcaseRow = ({ items, direction }: ShowcaseRowProps) => {
    const doubledItems = [...items, ...items];

    const containerAnimation = {
        animate: {
            x: direction === "left" ? [0, -100 * items.length] : [-100 * items.length, 0],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25,
                    ease: "linear",
                },
            },
        },
    };

    return (
        <div className="relative overflow-hidden py-2 border border-transparent rounded-xl">
            <motion.div
                className="flex gap-3 md:gap-4"
                variants={containerAnimation}
                animate="animate"
            >
                {doubledItems.map((item, index) => (
                    <div
                        key={`${item.id}-${index}`}
                        className="relative flex-none overflow-hidden rounded-lg"
                        style={{ width: "clamp(120px, 30vw, 250px)", height: "clamp(70px, 20vw, 150px)" }}
                    >
                        <img
                            src={item.image}
                            alt={item.alt}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export const Try = () => {
    return (
        <div className="flex h-[40rem] w-[22rem] border-transparent rounded-2xl  min-w-[60%] items-center justify-center bg-[#111111] px-2 sm:px-4 py-16">
            <div className="w-full max-w-6xl rounded-xl bg-[#111111] p-4 sm:p-8">
                <div className="flex flex-col gap-1">
                    {/* Showcase rows first */}
                    <div className="flex flex-col gap-2 mt-[-3rem]">
                        <ShowcaseRow items={showcaseItems1} direction="left" />
                        <ShowcaseRow items={showcaseItems2} direction="right" />
                    </div>
                    <div className="flex mt-[0.5rem] justify-center items-center flex-wrap gap-10">
                        {/* Text content below */}
                        <div className="lg:-ml-[3rem]">
                            <h2 className="text-2xl  font-medium tracking-tight text-gray-500">
                                Designed & built
                            </h2>
                            <div className="-mt-1 text-[5rem] tracking-tight text-white">
                                Using Relume
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="-mt-[1rem] flex justify-center gap-3 sm:gap-4">
                            <a
                                href="#"
                                className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium text-black transition-colors hover:bg-gray-100"
                            >
                                See full showcase
                            </a>
                            <a
                                href="#"
                                className="inline-flex items-center justify-center rounded-md border border-gray-700 bg-transparent px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-gray-800"
                            >
                                Become an Expert
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

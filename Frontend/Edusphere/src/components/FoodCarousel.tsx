import { useState, useEffect } from 'react';

interface CarouselImage {
    id: number;
    url: string;
    alt: string;
}

const images: CarouselImage[] = [
    {
        id: 1,
        url: "https://images.unsplash.com/photo-1545161296-d9c2c241f2ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        alt: "Mountain Biking"
    },
    {
        id: 2,
        url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        alt: "Cycling Race"
    },
    {
        id: 3,
        url: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        alt: "Indoor Sports"
    },
    {
        id: 4,
        url: "https://images.unsplash.com/photo-1605663864774-748f5f858a08?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        alt: "Cycling Track"
    }
];

const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const getPosition = (index: number) => {
        if (index === currentIndex) return 'center';
        if (index === currentIndex - 1 || (currentIndex === 0 && index === images.length - 1)) return 'left';
        if (index === currentIndex + 1 || (currentIndex === images.length - 1 && index === 0)) return 'right';
        return 'hidden';
    };

    const getImageStyles = (position: string): string => {
        switch (position) {
            case 'center':
                return 'translate-x-0 scale-100 opacity-100 z-20';
            case 'left':
                return '-translate-x-full scale-75 opacity-50 z-10';
            case 'right':
                return 'translate-x-full scale-75 opacity-50 z-10';
            default:
                return 'hidden';
        }
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto px-4 py-16">
            {/* Carousel Container */}
            <div className="relative h-[400px] overflow-hidden">
                <div className="absolute w-full h-full flex justify-center items-center">
                    {images.map((image, index) => (
                        <div
                            key={image.id}
                            className={`absolute w-full max-w-2xl transition-all duration-500 ease-in-out ${getImageStyles(
                                getPosition(index)
                            )}`}
                        >
                            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={image.url}
                                    alt={image.alt}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === index
                                ? 'bg-white w-6'
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
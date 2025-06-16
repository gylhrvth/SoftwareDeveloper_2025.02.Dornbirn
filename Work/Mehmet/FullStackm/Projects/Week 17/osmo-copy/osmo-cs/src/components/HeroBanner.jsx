import React, { useState, useEffect } from 'react';

import imageWelcome from "../assets/images/pexels-fwstudio-33348-172289.jpg";
import imageQuality from "../assets/images/pexels-puscau-daniel-florin-60408-217114.jpg";
import imageSustainability from "../assets/images/pexels-suzyhazelwood-1629236.jpg";

const slides = [
    {
        image: imageWelcome,
        title: "Willkommen bei uns",
        description: "Entdecken Sie unsere Produkte"
    },
    {
        image: imageQuality,
        title: "Qualität trifft Design",
        description: "Handgefertigte Produkte"
    },
    {
        image: imageSustainability,
        title: "Nachhaltigkeit",
        description: "Umweltfreundliche Materialien"
    }
];

const NavigationButton = ({ onClick, direction, className }) => (
    <button
        onClick={onClick}
        className={`absolute top-1/2 -translate-y-1/2 p-2 text-white text-9xl font-thin cursor-pointer ${
            direction === 'left' ? 'left-4' : 'right-4'
        } ${className || ''}`}
    >
        {direction === 'left' ? '‹' : '›'}
    </button>
);

const SlideIndicator = ({ isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`h-2 w-12 cursor-pointer transition-colors duration-700 ${
            isActive ? 'bg-white' : 'bg-stone-500'
        }`}
    />
);

const SlideContent = ({ image, title, description, isActive }) => (
    <div
        className={`
            h-full w-full flex-shrink-0 absolute
            transition-opacity duration-600
            ${isActive ? 'opacity-100' : 'opacity-0 delay-50'}
        `}
        style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}
    >
        <div className="flex h-full items-center justify-center bg-black/40">
            <div className="text-center text-white">
                <h1 className="mb-4 text-5xl font-bold">{title}</h1>
                <p className="text-xl">{description}</p>
            </div>
        </div>
    </div>
);

const HeroBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setInterval(() => {
            setCurrentSlide(prevSlide =>
                prevSlide === slides.length - 1 ? 0 : prevSlide + 1
            );
        }, 5000);

        return () => clearInterval(timer);
    }, [isAutoPlaying]);

    const navigateToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
    };

    const nextSlide = () => {
        setCurrentSlide(prevSlide =>
            prevSlide === slides.length - 1 ? 0 : prevSlide + 1
        );
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide(prevSlide =>
            prevSlide === 0 ? slides.length - 1 : prevSlide - 1
        );
        setIsAutoPlaying(false);
    };

    return (
        <div className="relative h-[480px] w-full overflow-hidden">
            {/* Slides Container */}
            <div className="h-full w-full">
                <div className="absolute flex h-full w-full">
                    {slides.map((slide, index) => (
                        <SlideContent
                            key={index}
                            {...slide}
                            isActive={currentSlide === index}
                        />
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <NavigationButton onClick={prevSlide} direction="left" />
            <NavigationButton onClick={nextSlide} direction="right" />

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {slides.map((_, index) => (
                    <SlideIndicator
                        key={index}
                        isActive={currentSlide === index}
                        onClick={() => navigateToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroBanner;

import React, { useMemo, useState, useEffect } from "react";
import svg2 from "../assets/svg2.svg";

const HeroPage = () => {
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);

    // Check scroll position to show/hide indicator
    useEffect(() => {
        const handleScroll = () => {
            const heroSection = document.getElementById('home');
            const aboutSection = document.getElementById('about');
            
            if (heroSection && aboutSection) {
                const heroRect = heroSection.getBoundingClientRect();
                const aboutRect = aboutSection.getBoundingClientRect();
                
                // Show indicator when:
                // 1. Hero section is mostly in view (more than 50% visible)
                // 2. OR we haven't reached the About section yet
                const isHeroVisible = heroRect.bottom > window.innerHeight * 0.3;
                const hasReachedAbout = aboutRect.top <= window.innerHeight * 0.5;
                
                setShowScrollIndicator(isHeroVisible && !hasReachedAbout);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ⭐ Generate stars once (fixes Math.random render error)
    const stars = useMemo(() => {
        return Array.from({ length: 100 }).map(() => ({
            size: Math.random() * 3 + 1,
            left: Math.random() * 100,
            top: Math.random() * 100,
            opacity: Math.random() * 0.8 + 0.2,
            animationDuration: Math.random() * 3 + 2,
            animationDelay: Math.random() * 5,
        }));
    }, []);

    return (
        <section id="home" className="relative pt-20 sm:pt-32 md:pt-20 lg:pt-10 xl:pt-10 overflow-hidden w-full min-h-screen">
            {/* 🌌 Night Sky Background with Stars */}
            <div className="fixed inset-0 pointer-events-none">
                {stars.map((star, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            left: `${star.left}%`,
                            top: `${star.top}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            opacity: star.opacity,
                            animation: `twinkle ${star.animationDuration}s infinite ${star.animationDelay}s`,
                        }}
                    />
                ))}
            </div>

            {/* 🌈 Background gradient effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-2 left-8 w-72 md:w-96 h-72 md:h-96 bg-secondary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-highlight/5 rounded-full blur-3xl"></div>
            </div>

            {/* 🔹 Main container */}
            <div className="relative w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-10">

                {/* TEXT CONTENT */}
                <div className="flex justify-start md:justify-end">
                    <div className="w-full md:w-2/3 mb-6 sm:mb-8 md:mb-0">

                        {/* Hey, There! */}
                        <div className="flex justify-start mb-4 sm:mb-6">
                            <span className="inline-block bg-highlight2 text-background px-4 py-2 sm:px-3 sm:py-1 rounded-[20px] text-2xl sm:text-2xl md:text-3xl xl:text-4xl font-body-bold">
                                Hey, There!
                            </span>
                        </div>

                        {/* Main paragraph */}
                        <p
                            className="
                                text-3xl
                                sm:text-xl
                                md:text-4xl
                                lg:text-5xl
                                xl:text-6xl
                                2xl:text-7xl
                                font-hero-bold
                                xl:hero-striking
                                leading-[1.3]
                                sm:leading-[1.2]
                                xl:leading-[1.15]
                                text-primary
                                text-justify
                                sm:text-left
                                mt-4
                                sm:mt-2
                            "
                        >
                            I work at the intersection of{" "}
                            <span className="inline-block bg-secondary text-background px-3 py-1 sm:px-2 sm:py-0.1 rounded-[30px] mb-2 mt-1">
                                Web Application
                            </span>
                            ,{" "}
                            <span className="inline-block bg-highlight text-background px-3 py-1 sm:px-2 sm:py-0.1 rounded-[30px] mb-2 mt-1">
                                Salesforce
                            </span>
                            , and{" "}
                            <span className="inline-block bg-accent text-background px-3 py-1 sm:px-2 sm:py-0.1 rounded-[30px] mt-1">
                                Scalable Systems
                            </span>
                            .
                        </p>
                    </div>
                </div>

                {/* 🖼️ ILLUSTRATION SECTION */}
                <div
                    className="
                        relative
                        w-full
                        max-w-[300px]
                        sm:max-w-[360px]
                        md:max-w-[420px]
                        lg:max-w-[520px]
                        h-[200px]
                        sm:h-[240px]
                        md:h-[250px]
                        lg:h-[320px]
                        mt-12
                        sm:mt-10
                        md:mt-8
                        mx-auto
                        md:mx-0
                    "
                >
                    <div className="absolute inset-0 flex items-center justify-center pt-0 px-4 sm:px-6 md:px-8">

                        {/* Background blob */}
                        <div className="absolute -top-8 lg:-top-20 -left-4 w-[120%] h-[120%]">
                            <svg
                                viewBox="0 0 200 200"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full scale-120 md:scale-130 lg:scale-130 xl:scale-180"
                            >
                                <path
                                    fill="#d1ff87"
                                    d="M47.3,-23.4C57,-10.4,57.7,11.6,48.3,31.8C38.9,52,19.5,70.4,2.9,68.7C-13.6,67,-27.3,45.3,-41.3,22.5C-55.3,-0.4,-69.6,-24.4,-62.7,-35.7C-55.9,-47,-28,-45.6,-4.6,-42.9C18.8,-40.3,37.5,-36.4,47.3,-23.4Z"
                                    transform="translate(100 100)"
                                />
                            </svg>
                        </div>

                        {/* Main SVG */}
                        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
                            <img
                                src={svg2}
                                alt="Main Illustration"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ⬇️ SCROLL INDICATOR - Shows only in Hero section */}
            {showScrollIndicator && (
                <div 
                    onClick={() => {
                        document.querySelector('#about')?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                    }}
                    className="fixed bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 transition-all duration-500 cursor-pointer z-50"
                    style={{ opacity: showScrollIndicator ? 1 : 0 }}
                >
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-sm tracking-[0.4em] uppercase text-secondary/80 font-medium animate-pulse">
                            Scroll down
                        </span>

                        <div className="relative">
                            {/* Outer ring */}
                            <div className="w-12 h-12 rounded-full border-2 border-secondary/30 animate-ping absolute"></div>

                            {/* Middle ring */}
                            <div className="w-12 h-12 rounded-full border border-secondary/40 absolute animate-pulse"></div>

                            {/* Arrow */}
                            <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-secondary/5 to-transparent rounded-full backdrop-blur-sm">
                                <div className="animate-bounce">
                                    <svg
                                        className="w-6 h-6 text-secondary drop-shadow-lg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2.5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default HeroPage;
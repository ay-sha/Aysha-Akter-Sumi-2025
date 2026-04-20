import React from "react";
import { FaPhone, FaInstagram, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { usePortfolio } from "../context/PortfolioContext";
import defaultMyPhoto from "/assets/myPhoto.png";

const AboutPage = () => {
    const { profile } = usePortfolio();
    const aboutImage = profile?.aboutImage || defaultMyPhoto;
    
    return (
        <section
            id="about"
            className="
                lg:min-h-screen
                bg-[#161616]
                px-6 sm:px-8 lg:px-12
                pt-5
                sm:pt-10
                md:pt-10
                lg:pt-[clamp(7rem,12vh,12rem)]
                pb-[clamp(3rem,5vh,5rem)]
            "
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-20">
                    <div className="lg:w-[60%]">
                        <div className="mb-10 lg:mb-12">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                                <span className="text-[#acd171]">{profile?.aboutHeadline || "I'm Aysha Akter Sumi, Building Scalable, User-Centric Applications."}</span>
                            </h1>
                        </div>

                        <div className="space-y-8 text-base md:text-lg text-stone-400 leading-relaxed">
                            <p className="text-lg md:text-xl">
                                {profile?.aboutDescription?.[0] || "I'm a software engineer with experience across full-stack development and enterprise systems."}
                            </p>
                            <p className="text-lg md:text-xl">
                                {profile?.aboutDescription?.[1] || `Currently, I work at ${profile?.currentCompany || 'Twinforce Solution Limited'}.`}
                            </p>
                        </div>
                    </div>

                    <div className="lg:w-[40%]">
                        <div className="flex flex-col md:flex-row lg:flex-col gap-8 lg:gap-10">
                            <div className="flex-shrink-0 md:w-2/5 lg:w-full">
                                <div className="relative w-full max-w-xs sm:max-w-sm mx-auto md:mx-0 md:w-full rounded-2xl overflow-hidden shadow-xl 
                                               lg:transform lg:rotate-5 transition-transform duration-300">
                                    <img
                                        src={aboutImage}
                                        alt={profile?.name || 'Aysha Akter Sumi'}
                                        className="w-full h-auto aspect-square object-cover"
                                    />
                                </div>
                            </div>

                            <div className="md:flex-1 lg:flex-none">
                                <div className="space-y-5">
                                    <a
                                        href={`tel:${profile?.phone || '+8801884394630'}`}
                                        className="group flex items-center gap-3 hover:text-[#7979EF] transition-colors"
                                    >
                                        <FaPhone className="w-4 h-4 text-gray-500 group-hover:text-[#7979EF] transition-colors" />
                                        <span className="font-medium text-stone-200 group-hover:text-[#7979EF] transition-colors text-sm sm:text-base">{profile?.phone || '+880 1884-394630'}</span>
                                    </a>

                                    <a
                                        href={profile?.instagram || 'https://www.instagram.com/aysha__amin_'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-3 hover:text-[#7979EF] transition-colors"
                                    >
                                        <FaInstagram className="w-4 h-4 text-gray-500 group-hover:text-[#7979EF] transition-colors" />
                                        <span className="font-medium text-stone-200 group-hover:text-[#7979EF] transition-colors text-sm sm:text-base">Follow on Instagram</span>
                                    </a>

                                    <a
                                        href={profile?.github || 'http://github.com/ay-sha'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-3 hover:text-[#7979EF] transition-colors"
                                    >
                                        <FaGithub className="w-4 h-4 text-gray-500 group-hover:text-[#7979EF] transition-colors" />
                                        <span className="font-medium text-stone-200 group-hover:text-[#7979EF] transition-colors text-sm sm:text-base">Follow on GitHub</span>
                                    </a>

                                    <a
                                        href={profile?.linkedin || 'http://www.linkedin.com/in/aysha-akter-sumi'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-3 hover:text-[#7979EF] transition-colors"
                                    >
                                        <FaLinkedin className="w-4 h-4 text-gray-500 group-hover:text-[#7979EF] transition-colors" />
                                        <span className="font-medium text-stone-200 group-hover:text-[#7979EF] transition-colors text-sm sm:text-base">Follow on LinkedIn</span>
                                    </a>

                                    <div className="pt-3">
                                        <hr className="border-gray-600" />
                                    </div>

                                    <a
                                        href={`mailto:${profile?.email || 'ayshaaktersumi630@gmail.com'}`}
                                        className="group flex items-center gap-3 hover:text-[#7979EF] transition-colors pt-3"
                                    >
                                        <FaEnvelope className="w-4 h-4 text-gray-500 group-hover:text-[#7979EF] transition-colors" />
                                        <span className="font-medium text-stone-200 group-hover:text-[#7979EF] transition-colors text-sm sm:text-base">{profile?.email || 'ayshaaktersumi630@gmail.com'}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPage;
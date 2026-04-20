import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
    FaGithub,
    FaExternalLinkAlt,
    FaStar,
    FaCode,
    FaFilter,
    FaChevronRight,
    FaChevronLeft,
    FaPhone,
    FaInstagram,
    FaLinkedin,
    FaEnvelope
} from 'react-icons/fa';

const defaultProjects = [
    {
        id: 1,
        title: 'Nivaasi',
        description: 'Nivaasi is a full-stack accommodation rental web application that enables users to discover, list, and review unique stays worldwide.',
        longDescription: 'It delivers a seamless rental experience with user authentication, property listings, reviews, search, and filtering features.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'EJS', 'Bootstrap', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Cloudinary', 'Joi', 'Passport.js', 'Render.com'],
        category: 'fullstack',
        github: 'https://github.com/ay-sha/Nivaasi',
        liveDemo: 'https://nivaasi.onrender.com/',
        image: '/Projects/nivaasi.png',
        impact: 'Enhanced user engagement and simplified property discovery and management.',
    },
    {
        id: 2,
        title: 'Defiine',
        description: 'Defiine is a simple and responsive online dictionary web application for quick and accurate word lookups.',
        longDescription: 'It provides real-time word definitions, parts of speech, synonyms, and example usages.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Dictionary API integration'],
        category: 'frontend',
        github: 'https://github.com/ay-sha/Defiine',
        liveDemo: 'https://ay-sha.github.io/Defiine/',
        image: '/Projects/defiine.PNG',
        impact: 'Improved vocabulary access and learning efficiency.',
    },
    {
        id: 3,
        title: 'Infinity',
        description: 'Infinity is a responsive corporate website developed for an IT company.',
        longDescription: 'It is designed to enhance an IT company\'s digital presence through a clean, responsive, and professional interface.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'OWL Carousel (jQuery)'],
        category: 'frontend',
        github: 'https://github.com/ay-sha/Infinity',
        liveDemo: 'https://ay-sha.github.io/Infinity/',
        image: '/Projects/infinity.PNG',
        impact: 'Strengthened the company\'s digital presence.',
    },
    {
        id: 4,
        title: 'DIU NoteShare',
        description: 'DIU NoteShare is a full-stack web application that enables DIU students to share and access academic notes.',
        longDescription: 'It provides secure user authentication, note upload and download, and powerful search features.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Django', 'Python', 'SQLite'],
        category: 'fullstack',
        github: 'https://github.com/ay-sha/DIU_NoteShare',
        liveDemo: null,
        image: '/Projects/noteshare.jpg',
        impact: 'Improved collaboration and easier access to study materials.',
    },
    {
        id: 5,
        title: 'Remover',
        description: 'It is a web application that allows users to quickly remove image backgrounds.',
        longDescription: 'It enables users to upload images and automatically generate clean, background-free results.',
        technologies: ['React', 'TailwindCSS', 'Firebase', 'Cloudinary', 'Stripe'],
        category: 'fullstack',
        github: 'https://github.com/ay-sha/Remover',
        liveDemo: null,
        image: '/Projects/remover.jpeg',
        impact: 'Simplified image editing and saved user time.',
    },
    {
        id: 6,
        title: '2D Car Game',
        description: 'A 2D Car Game developed using C++ and OpenGL where players navigate a car to avoid obstacles.',
        longDescription: 'The game offers a simple yet engaging 2D environment with real-time controls.',
        technologies: ['C++', 'OpenGL'],
        category: 'graphics',
        github: 'https://github.com/ay-sha/2D_CarGame',
        liveDemo: null,
        image: '/Projects/2Dgame.jpg',
        impact: 'Strengthened understanding of game logic and graphics rendering.',
    },
];

const ProjectsPage = () => {
    const { projects, profile } = usePortfolio();
    const [activeFilter, setActiveFilter] = useState('all');
    const [hoveredProject, setHoveredProject] = useState(null);
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [copied, setCopied] = useState(false);

    const categories = [
        { id: 'all', label: 'All Projects', icon: '🚀' },
        { id: 'frontend', label: 'Frontend', icon: '💻' },
        { id: 'fullstack', label: 'Full Stack', icon: '🌐' },
        { id: 'graphics', label: 'Graphics Design', icon: '🎨' },
        { id: 'salesforce', label: 'Salesforce', icon: '☁️' },
    ];

    const displayProjects = projects.length > 0 ? projects : defaultProjects;

    const filteredProjects = activeFilter === 'all'
        ? displayProjects
        : displayProjects.filter(project => project.category === activeFilter);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const scroll = (direction) => {
        if (containerRef.current) {
            const scrollAmount = 600;
            containerRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
        }
    };

    return (
        <section id="projects" className="min-h-screen bg-gradient-to-b from-background to-gray-900 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-96 h-96 bg-highlight/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full bg-highlight flex items-center justify-center">
                            <FaCode className="text-white text-xl" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
                            Project Portfolio
                        </h1>
                    </div>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Showcasing innovative solutions across full-stack development, Salesforce, and modern web technologies
                    </p>
                </div>

                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <FaFilter className="text-highlight text-xl" />
                            <h2 className="text-2xl font-bold text-white">Filter by Category</h2>
                        </div>
                        <div className="text-gray-400 text-sm hidden sm:block">
                            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveFilter(category.id)}
                                className={`
                                    group relative flex items-center gap-3 px-6 py-3 rounded-xl
                                    transition-all duration-300 transform hover:scale-105
                                    ${activeFilter === category.id
                                        ? 'bg-highlight2 text-white shadow-lg'
                                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                                    }
                                `}
                            >
                                <span className="text-lg">{category.icon}</span>
                                <span className="font-medium">{category.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 flex items-center justify-center text-white hover:bg-gray-700/80 transition-all duration-300 z-20 hidden lg:flex"
                    >
                        <FaChevronLeft />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 flex items-center justify-center text-white hover:bg-gray-700/80 transition-all duration-300 z-20 hidden lg:flex"
                    >
                        <FaChevronRight />
                    </button>

                    <div
                        ref={containerRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        className="flex gap-8 pb-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="flex-shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)] snap-center"
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                <div className={`
                                    group relative h-full rounded-3xl overflow-hidden border border-gray-800/50 
                                    bg-gradient-to-br from-gray-900/50 to-background/30 backdrop-blur-sm
                                    transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl
                                    flex flex-col
                                    ${hoveredProject === project.id ? 'ring-2 ring-secondary/50' : ''}
                                `}>
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                                        <div className="absolute bottom-4 left-4">
                                            <span className="px-3 py-1 rounded-full bg-gray-900/80 backdrop-blur-sm text-white text-xs font-medium">
                                                {categories.find(c => c.id === project.category)?.label}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-xl font-bold text-white group-hover:text-highlight transition-colors">
                                                {project.title}
                                            </h3>
                                            <div className="flex gap-2">
                                                {project.github && (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                                                    >
                                                        <FaGithub />
                                                    </a>
                                                )}
                                                {project.liveDemo && (
                                                    <a
                                                        href={project.liveDemo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-10 h-10 rounded-full bg-accent flex items-center justify-center !text-white hover:opacity-90 transition-opacity"
                                                    >
                                                        <FaExternalLinkAlt />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-gray-300 mb-6 line-clamp-2">
                                            {project.description}
                                        </p>

                                        <div className="mb-6">
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech, idx) => (
                                                    <span key={idx} className="px-3 py-1 rounded-full bg-gray-800/50 text-gray-300 text-xs font-medium">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-6">
                                            <div className="p-4 rounded-xl bg-gradient-to-r from-secondary/10 to-secondary/20 border border-secondary/20">
                                                <div className="text-sm text-highlight2 font-medium">Impact</div>
                                                <div className="text-white text-sm mt-1">{project.impact}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8">
                    <div className="text-center p-4 md:p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm">
                        <div className="text-xl sm:text-3xl font-bold text-highlight">{displayProjects.length}</div>
                        <div className="text-gray-300 mt-1 sm:mt-2 text-xs sm:text-base">Total Projects</div>
                    </div>

                    <div className="text-center p-4 md:p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm">
                        <div className="text-xl sm:text-3xl font-bold text-highlight">
                            {new Set(displayProjects.flatMap(p => p.technologies)).size}
                        </div>
                        <div className="text-gray-300 mt-1 sm:mt-2 text-xs sm:text-base">Technologies</div>
                    </div>

                    <div className="text-center p-4 md:p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm">
                        <div className="text-xl sm:text-3xl font-bold text-highlight">
                            {displayProjects.filter(p => p.liveDemo).length}
                        </div>
                        <div className="text-gray-300 mt-1 sm:mt-2 text-xs sm:text-base">Live Demos</div>
                    </div>
                </div>

                <div className="mt-24 text-center" id="contact">
                    <div className="relative inline-flex flex-col sm:flex-row items-center gap-8 p-10 rounded-3xl bg-gradient-to-br from-accent/10 via-gray-900/60 to-background/40 backdrop-blur-md border border-accent/30 shadow-[0_0_60px_-15px_rgba(99,102,241,0.45)]">
                        <div className="absolute inset-0 rounded-3xl bg-accent/10 blur-2xl -z-10" />

                        <div className="text-left max-w-md">
                            <h3 className="text-3xl font-extrabold text-white mb-2">
                                Have a project in mind?
                            </h3>
                            <p className="text-gray-300 mb-3 font-body">
                                Let's build something meaningful, scalable, and user-centric.
                            </p>

                            <p className="text-base text-gray-400 font-body-bold mb-4">
                                Reach me at{" "}
                                <span className="text-highlight2 font-body-bold">
                                    {profile?.email || "ayshaaktersumi630@gmail.com"}
                                </span>
                            </p>
                            <div className="flex items-center gap-5">
                                <div className="relative group">
                                    <a
                                        onClick={() => {
                                            navigator.clipboard.writeText(profile?.phone || "+8801884394630");
                                            setCopied(true);
                                            setTimeout(() => setCopied(false), 2000);
                                        }}
                                        className='cursor-pointer'
                                    >
                                        <FaPhone className="text-xl text-gray-300 hover:text-highlight transition-colors" />
                                    </a>

                                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                                        <div className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-700 text-sm text-white shadow-xl whitespace-nowrap">
                                            {copied ? (
                                                <span className="text-green-400 font-medium">✓ Number copied</span>
                                            ) : (
                                                <>
                                                    {profile?.phone || "+880 1884-394630"}
                                                    <div className="text-xs text-gray-400 text-center">click to copy</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <a href={profile?.instagram || "https://www.instagram.com/aysha__amin_"} target="_blank" rel="noopener noreferrer">
                                    <FaInstagram className="text-xl text-gray-300 hover:text-highlight transition-colors" />
                                </a>

                                <a href={profile?.github || "https://github.com/ay-sha"} target="_blank" rel="noopener noreferrer">
                                    <FaGithub className="text-xl text-gray-300 hover:text-highlight transition-colors" />
                                </a>

                                <a href={profile?.linkedin || "https://www.linkedin.com/in/aysha-akter-sumi"} target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className="text-xl text-gray-300 hover:text-highlight transition-colors" />
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col items-center sm:items-start gap-4">
                            <a
                                href={`mailto:${profile?.email || "ayshaaktersumi630@gmail.com"}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-9 py-4 rounded-full bg-black !text-highlight font-body-bold text-xl hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg"
                            >
                                Send an Email
                                <FaExternalLinkAlt className="text-sm" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
            `}</style>
        </section>
    );
};

export default ProjectsPage;
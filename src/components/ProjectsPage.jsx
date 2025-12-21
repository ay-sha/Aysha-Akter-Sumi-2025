import React, { useState, useRef } from 'react';
import {
    FaGithub,
    FaExternalLinkAlt,
    FaStar,
    FaCode,
    FaServer,
    FaDatabase,
    FaSalesforce,
    FaReact,
    FaFilter,
    FaChevronRight,
    FaChevronLeft,
    FaPhone, FaInstagram, FaLinkedin, FaEnvelope
} from 'react-icons/fa';
import { SiRedux, SiTailwindcss, SiMongodb, SiExpress, SiNodedotjs } from 'react-icons/si';

const ProjectsPage = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [hoveredProject, setHoveredProject] = useState(null);
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [copied, setCopied] = useState(false);

    // Project categories
    const categories = [
        { id: 'all', label: 'All Projects', icon: '🚀' },
        { id: 'frontend', label: 'Frontend', icon: '💻' },
        // { id: 'backend', label: 'Backend', icon: '⚙️'},
        { id: 'fullstack', label: 'Full Stack', icon: '🌐' },
        { id: 'graphics', label: 'Graphics Design', icon: '🎨' },
        { id: 'salesforce', label: 'Salesforce', icon: '☁️' },
    ];

    // Project data with detailed information
    const projects = [
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
        // {
        //     id: 2,
        //     title: 'Salesforce Customer Portal',
        //     description: 'Custom customer portal built on Salesforce Experience Cloud with automated workflows.',
        //     longDescription: 'Implemented Lightning Web Components and Apex classes to create a seamless customer experience portal. Integrated with external systems and provided real-time data synchronization.',
        //     technologies: ['LWC', 'APEX', 'SOQL', 'Flows', 'Experience Cloud'],
        //     category: 'salesforce',
        //     github: 'https://github.com/yourusername/salesforce-portal',
        //     liveDemo: null,
        //     image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w-800&auto=format&fit=crop',
        //     tags: ['Salesforce', 'Portal', 'Automation', 'LWC'],
        //     impact: 'Reduced support tickets by 60%',
        // },
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
            description: 'Infinity is a responsive corporate website developed for an IT company, designed to present services, branding, and content with a modern and professional user experience.',
            longDescription: 'It is  designed to enhance an IT company\'s digital presence through a clean, responsive, and professional interface.',
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
            description: 'DIU NoteShare is a full-stack web application that enables DIU students to share and access academic notes in one centralized platform.',
            longDescription: 'It provides secure user authentication, note upload and download, and powerful search features for course-based learning resources.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Django', 'Python', 'SQLite'],
            category: 'fullstack',
            github: 'https://github.com/ay-sha/DIU_NoteShare',
            liveDemo: null,
            image: '/Projects/noteshare.jpg',
            impact: 'Improved collaboration and easier access to study materials.',
        },
        // {
        //     id: 6,
        //     title: 'API Gateway & Microservices',
        //     description: 'High-performance API gateway with rate limiting and microservices architecture.',
        //     longDescription: 'Designed and implemented a scalable microservices architecture with API gateway, service discovery, and circuit breakers. Includes monitoring, logging, and automated scaling.',
        //     technologies: ['Node.js', 'Express', 'Redis', 'Docker', 'Kubernetes'],
        //     category: 'backend',
        //     github: 'https://github.com/yourusername/api-gateway',
        //     liveDemo: null,
        //     image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop',
        //     tags: ['Microservices', 'Scalable', 'API', 'DevOps'],
        //     impact: 'Reduced latency by 40%',
        // },
        {
            id: 5,
            title: 'Remover',
            description: 'It is a web application that allows users to quickly remove image backgrounds through a simple and intuitive interface.',
            longDescription: 'It enables users to upload images and automatically generate clean, background-free results with minimal effort.',
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
            description: 'A 2D Car Game developed using C++ and OpenGL where players navigate a car to avoid obstacles and score points.',
            longDescription: 'The game offers a simple yet engaging 2D environment with real-time controls and obstacle-based gameplay.',
            technologies: ['C++', 'OpenGL'],
            category: 'graphics',
            github: 'https://github.com/ay-sha/2D_CarGame',
            liveDemo: null,
            image: '/Projects/2Dgame.jpg',
            impact: 'Strengthened understanding of game logic and graphics rendering.',
        },
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    // Handle horizontal scroll with mouse drag
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
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-96 h-96 bg-highlight/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: '2s' }}></div>

                {/* Floating Tech Icons */}
                {['⚛️', '🚀', '💻', '☁️', '🎨', '⚡'].map((icon, idx) => (
                    <div
                        key={idx}
                        className="absolute text-4xl opacity-10 animate-float"
                        style={{
                            left: `${20 + idx * 15}%`,
                            top: `${30 + Math.sin(idx) * 30}%`,
                            animationDelay: `${idx * 0.5}s`,
                            animationDuration: `${10 + idx * 2}s`
                        }}
                    >
                        {icon}
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full bg-highlight flex items-center justify-center">
                            <FaCode className="text-white text-xl" />
                        </div>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary">
                            Project Portfolio
                        </h1>
                    </div>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Showcasing innovative solutions across full-stack development, Salesforce, and modern web technologies
                    </p>
                </div>

                {/* Category Filters */}
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
                                <span className={`
                                    absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs
                                    ${activeFilter === category.id ? 'bg-white text-gray-900' : 'bg-gray-700 text-gray-300'}
                                `}>
                                    {projects.filter(p => category.id === 'all' || p.category === category.id).length}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid with Horizontal Scroll */}
                <div className="relative">
                    {/* Scroll Buttons */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 
                                 w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 
                                 flex items-center justify-center text-white hover:bg-gray-700/80 
                                 transition-all duration-300 z-20 hidden lg:flex"
                    >
                        <FaChevronLeft />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 
                                 w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 
                                 flex items-center justify-center text-white hover:bg-gray-700/80 
                                 transition-all duration-300 z-20 hidden lg:flex"
                    >
                        <FaChevronRight />
                    </button>

                    {/* Projects Container */}
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
                                className="flex-shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)] 
                                         snap-center"
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

                                    {/* Project Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

                                        {/* Category Badge */}
                                        <div className="absolute bottom-4 left-4">
                                            <span className="px-3 py-1 rounded-full bg-gray-900/80 backdrop-blur-sm text-white text-xs font-medium">
                                                {categories.find(c => c.id === project.category)?.label}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Project Content */}
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
                                                        className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center 
                                                                 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <FaGithub />
                                                    </a>
                                                )}
                                                {project.liveDemo && (
                                                    <a
                                                        href={project.liveDemo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-10 h-10 rounded-full bg-accent 
                                                                 flex items-center justify-center !text-white hover:opacity-90 transition-opacity"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <FaExternalLinkAlt />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-gray-300 mb-6 line-clamp-2">
                                            {project.description}
                                        </p>

                                        {/* Tech Stack */}
                                        <div className="mb-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                                                    <FaCode className="text-xs text-gray-400" />
                                                </div>
                                                <span className="text-sm text-gray-400">Tech Stack</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1 rounded-full bg-gray-800/50 text-gray-300 text-xs font-medium"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Impact Section - Sticks to bottom */}
                                        <div className="mt-auto pt-6">
                                            <div className="p-4 rounded-xl bg-gradient-to-r from-secondary/10 to-secondary/20 border border-secondary/20">
                                                <div className="text-sm text-highlight2 font-medium">Impact</div>
                                                <div className="text-white text-sm mt-1">{project.impact}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent 
                                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 
                                                        transition-transform duration-500">
                                            <div className="text-sm text-gray-300 line-clamp-3">
                                                {project.longDescription}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8">
                    <div className="text-center p-4 md:p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm">
                        {/* Adjusted font size: text-xl on mobile, text-3xl on small screens and up */}
                        <div className="text-xl sm:text-3xl font-bold text-highlight">{projects.length}</div>
                        {/* Adjusted font size: text-xs on mobile, text-base on small screens and up */}
                        <div className="text-gray-300 mt-1 sm:mt-2 text-xs sm:text-base">Total Projects</div>
                    </div>

                    <div className="text-center p-4 md:p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm">
                        <div className="text-xl sm:text-3xl font-bold text-highlight">
                            {new Set(projects.flatMap(p => p.technologies)).size}
                        </div>
                        <div className="text-gray-300 mt-1 sm:mt-2 text-xs sm:text-base">Technologies</div>
                    </div>

                    <div className="text-center p-4 md:p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm">
                        <div className="text-xl sm:text-3xl font-bold text-highlight">
                            {projects.filter(p => p.liveDemo).length}
                        </div>
                        <div className="text-gray-300 mt-1 sm:mt-2 text-xs sm:text-base">Live Demos</div>
                    </div>
                </div>
                {/* Contact / Call to Action */}
                <div className="mt-24 text-center" id="contact">
                    <div
                        className="
                            relative inline-flex flex-col sm:flex-row items-center gap-8 p-10 rounded-3xl
                            bg-gradient-to-br from-accent/10 via-gray-900/60 to-background/40
                            backdrop-blur-md border border-accent/30
                            shadow-[0_0_60px_-15px_rgba(99,102,241,0.45)]
                            "
                    >
                        {/* Glow Accent */}
                        <div className="absolute inset-0 rounded-3xl bg-accent/10 blur-2xl -z-10" />

                        {/* Text */}
                        <div className="text-left max-w-md">
                            <h3 className="text-3xl font-extrabold text-white mb-2">
                                Have a project in mind?
                            </h3>
                            <p className="text-gray-300 mb-3 font-body">
                                Let’s build something meaningful, scalable, and user-centric.
                            </p>

                            {/* Email */}
                            <p className="text-base text-gray-400 font-body-bold mb-4">
                                Reach me at{" "}
                                <span className="text-highlight2 font-body-bold">
                                    ayshaaktersumi630@gmail.com
                                </span>
                            </p>
                            <div className="flex items-center gap-5">
                                {/* PHONE */}
                                <div className="relative group">
                                    <a
                                        onClick={() => {
                                            navigator.clipboard.writeText("+8801884394630");
                                            setCopied(true);
                                            setTimeout(() => setCopied(false), 2000);
                                        }}
                                        className='cursor-pointer'
                                    >
                                        <FaPhone className="text-xl text-gray-300 hover:text-highlight transition-colors" />
                                    </a>

                                    {/* Tooltip */}
                                    <div
                                        className="
                                            absolute left-1/2 -translate-x-1/2 top-full mt-3
                                            opacity-0 group-hover:opacity-100
                                            transition-all duration-300
                                            pointer-events-none
                                        ">
                                        <div
                                            className="
                                                px-4 py-2 rounded-xl bg-gray-900
                                                border border-gray-700
                                                text-sm text-white
                                                shadow-xl whitespace-nowrap
                                                ">
                                            {copied ? (
                                                <span className="text-green-400 font-medium">
                                                    ✓ Number copied
                                                </span>
                                            ) : (
                                                <>
                                                    +880 1884-394630
                                                    <div className="text-xs text-gray-400 text-center">
                                                        click to copy
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* INSTAGRAM */}
                                <a
                                    href="https://www.instagram.com/aysha__amin_?igsh=YmExcGtjeThweTdz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaInstagram className="text-xl text-gray-300 hover:text-highlight transition-colors" />
                                </a>

                                {/* GITHUB */}
                                <a
                                    href="http://github.com/ay-sha"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaGithub className="text-xl text-gray-300 hover:text-highlight transition-colors" />
                                </a>

                                {/* LINKEDIN */}
                                <a
                                    href="http://www.linkedin.com/in/aysha-akter-sumi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaLinkedin className="text-xl text-gray-300 hover:text-highlight transition-colors" />
                                </a>
                            </div>

                        </div>

                        {/* Actions */}
                        <div className="flex flex-col items-center sm:items-start gap-4">
                            <a
                                href="mailto:ayshaaktersumi630@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    px-9 py-4 rounded-full bg-black !text-highlight font-body-bold
                                    text-xl
                                    hover:opacity-90 transition-opacity
                                    flex items-center gap-2 shadow-lg
                                    "
                            >
                                Send an Email
                                <FaExternalLinkAlt className="text-sm" />
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            {/* Custom Scrollbar Hide */}
            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                .animate-float {
                    animation: float 10s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default ProjectsPage;
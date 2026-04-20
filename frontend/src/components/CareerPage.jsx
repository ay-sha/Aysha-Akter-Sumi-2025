import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import API_URL from '../config.js';
import {
    FaUniversity,
    FaBriefcase,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaGraduationCap,
    FaAward,
    FaChevronRight,
    FaStar,
    FaCode,
    FaCloud,
    FaExternalLinkAlt,
} from 'react-icons/fa';

const iconMap = {
    FaCloud,
    FaBriefcase,
    FaUniversity,
    FaGraduationCap,
    FaCode,
    FaStar
};

const defaultExperiences = [
    {
        id: 1,
        position: 'Jr. Salesforce Developer',
        company: 'Twinforce Solution Limited',
        startMonth: 'November',
        startYear: '2025',
        endMonth: '',
        endYear: '',
        duration: 'Current',
        location: 'Dhaka, Bangladesh',
        type: 'Full-time',
        description: 'Leading development of enterprise Salesforce solutions with focus on automotive dealership management systems handling high-volume transactions.',
        responsibilities: [
            'Architected and developed a Car and Parts Dealership Management System from ground up',
            'Built custom Lightning Web Components with Tailwind CSS for modern, responsive UI',
            'Implemented complex APEX logic, triggers, and optimized SOQL queries',
            'Designed and implemented lifetime warranty tracking and service claims systems',
            'Created custom Salesforce objects and automation flows for streamlined business processes',
            'Managed security and access controls for 200+ internal users across departments'
        ],
        technologies: ['Salesforce APEX', 'Lightning Web Components (LWC)', 'SOQL', 'Salesforce Flows', 'Tailwind CSS', 'JavaScript'],
        achievements: [
            'Built system to handle 1,600–4,000+ annual transactions and 20,000+ lifetime records',
            'Reduced manual data entry by 85% through comprehensive automation'
        ],
        icon: 'FaCloud',
        color: 'from-secondary/10 to-secondary/30',
        isCurrent: true
    },
    {
        id: 2,
        position: 'Salesforce Developer Intern',
        company: 'Twinforce Solution Limited',
        startMonth: 'August',
        startYear: '2025',
        endMonth: 'October',
        endYear: '2025',
        duration: '3 Months',
        location: 'Dhaka, Bangladesh',
        type: 'Internship',
        description: 'Hands-on Salesforce development focusing on customization, automation, and system integration.',
        responsibilities: [
            'Developed Lightning Web Components (LWC) to support internal business workflows',
            'Implemented APEX classes and triggers to handle custom business logic',
            'Optimized SOQL queries for efficient data retrieval'
        ],
        technologies: ['Salesforce', 'APEX', 'LWC', 'SOQL'],
        achievements: [
            'Contributed to production-ready Salesforce features'
        ],
        icon: 'FaBriefcase',
        color: 'from-secondary/10 to-secondary/30',
        isCurrent: false
    }
];

const defaultEducation = [
    {
        id: 1,
        degree: 'Bachelor of Science in Computer Science and Engineering',
        institution: 'Daffodil International University',
        startMonth: 'January',
        startYear: '2020',
        endMonth: 'October',
        endYear: '2024',
        duration: '4 Years',
        location: 'Dhaka, Bangladesh',
        grade: 'CGPA: 3.93/4.00',
        achievements: [
            'Merit Based Scholarship , 2020-2024',
            '8th(Top 5%) Unlock The Algorithm Programming Contest, Spring 2022',
        ],
        courses: ['Data Structures & Algorithms', 'Database Management Systems', 'System Design', 'Web Technologies', 'Machine Learning', 'Computer Networks'],
        icon: 'FaUniversity',
        color: 'from-secondary/10 to-secondary/30'
    }
];

const CareerPage = () => {
    const { profile } = usePortfolio();
    const [experiences, setExperiences] = useState([]);
    const [education, setEducation] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [expRes, eduRes] = await Promise.all([
                    fetch(`${API_URL}/api/experiences`),
                    fetch(`${API_URL}/api/education`)
                ]);
                const expData = await expRes.json();
                const eduData = await eduRes.json();
                if (expData?.length) setExperiences(expData.map(exp => ({ ...exp, icon: 'FaBriefcase', color: 'from-secondary/10 to-secondary/30' })));
                if (eduData?.length) setEducation(eduData.map(edu => ({ ...edu, icon: 'FaUniversity', color: 'from-secondary/10 to-secondary/30' })));
            } catch (e) {
                console.log('Using default data', e);
            }
        };
        fetchData();
    }, []);

    const getIcon = (iconName) => iconMap[iconName] || FaBriefcase;

    const [activeTab, setActiveTab] = useState('experience');

    const sortedExperiences = [...(experiences.length > 0 ? experiences : defaultExperiences)].sort((a, b) => {
      if (a.isCurrent && !b.isCurrent) return -1;
      if (!a.isCurrent && b.isCurrent) return 1;
      const yearB = parseInt(b.startYear) || 0;
      const yearA = parseInt(a.startYear) || 0;
      if (yearB !== yearA) return yearB - yearA;
      const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const monthB = monthOrder.indexOf(b.startMonth);
      const monthA = monthOrder.indexOf(a.startMonth);
      return monthB - monthA;
    });
    
    const sortedEducation = [...(education.length > 0 ? education : defaultEducation)].sort((a, b) => {
      if (a.isCurrent && !b.isCurrent) return -1;
      if (!a.isCurrent && b.isCurrent) return 1;
      const yearB = parseInt(b.startYear) || 0;
      const yearA = parseInt(a.startYear) || 0;
      return yearB - yearA;
    });

    const displayExperiences = sortedExperiences;
    const displayEducation = sortedEducation;

    return (
        <section id="career" className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-px bg-gradient-to-r from-transparent via-highlight/40 to-transparent" />
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-secondary/10 to-secondary/30 flex items-center justify-center">
                            <FaBriefcase className="text-gray-200 text-lg sm:text-2xl" />
                        </div>
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-hero-bold text-primary text-center leading-tight">
                            Career Journey
                        </h1>
                    </div>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        From academic excellence at Daffodil International University to building enterprise Salesforce solutions at Twinforce
                    </p>
                </div>

                <div className="flex justify-center mb-12">
                    <div className="inline-flex rounded-2xl bg-gray-800/50 backdrop-blur-sm p-2 border border-gray-700/50">
                        <button
                            onClick={() => setActiveTab('experience')}
                            className={`cursor-pointer flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 ${activeTab === 'experience' ? 'bg-gradient-to-r from-secondary/10 to-secondary/30 text-gray-200 shadow-lg' : 'text-gray-300 hover:text-gray-200 hover:bg-gray-700/50'}`}
                        >
                            <FaBriefcase />
                            <span className="font-medium">Experience</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('education')}
                            className={`cursor-pointer flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 ${activeTab === 'education' ? 'bg-gradient-to-r from-secondary/10 to-secondary/30 text-gray-200 shadow-lg' : 'text-gray-300 hover:text-gray-200 hover:bg-gray-700/50'}`}
                        >
                            <FaUniversity />
                            <span className="font-medium">Education</span>
                        </button>
                    </div>
                </div>

                <div className="space-y-6 sm:space-y-8">
                    {(activeTab === 'experience' ? displayExperiences : displayEducation).map((item, idx) => (
                        <div key={item._id || item.id || idx} className="relative group cursor-pointer">
                            <div className="hidden lg:block absolute left-1/2 top-8 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                <div className={`w-6 h-6 rounded-full border-4 border-background transition-all duration-300 ${item.isCurrent ? 'bg-secondary' : 'bg-gray-600'}`} />
                            </div>

                            <div className="relative rounded-3xl overflow-hidden border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-background/30 backdrop-blur-sm transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl">
                                {item.isCurrent && (
                                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                                        <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-secondary/10 to-secondary/30 text-gray-200 text-xs sm:text-sm font-medium">
                                            <FaStar className="text-xs" />
                                            <span className="hidden sm:inline">Current Position</span>
                                        </div>
                                    </div>
                                )}

                                <div className={`p-4 sm:p-6 bg-gradient-to-r ${item.color} bg-opacity-10`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-r ${item.color || 'from-secondary/10 to-secondary/30'} flex items-center justify-center`}>
                                                {React.createElement(getIcon(item.icon), { className: "text-gray-200 text-xl sm:text-2xl" })}
                                            </div>

                                            <div>
                                                <h3 className="text-xl sm:text-2xl font-bold text-gray-200 leading-tight">
                                                    {activeTab === 'experience' ? item.position : item.degree}
                                                </h3>

                                                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                                                    <span className="text-secondary font-medium text-sm sm:text-base">
                                                        {activeTab === 'experience' ? item.company : item.institution}
                                                    </span>

                                                    {item.type && (
                                                        <span className="px-2.5 sm:px-3 py-1 rounded-full bg-gray-800/50 text-gray-300 text-xs sm:text-sm">
                                                            {item.type}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 sm:p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800/50 flex items-center justify-center">
                                                <FaCalendarAlt className="text-gray-400 text-sm sm:text-base" />
                                            </div>
                                            <div>
                                                <div className="text-xs sm:text-sm text-gray-400">Period</div>
                                                <div className="font-medium text-gray-200 text-sm sm:text-base">
                                                    {item.startMonth} {item.startYear} - {item.isCurrent ? 'Present' : `${item.endMonth} ${item.endYear}`}
                                                </div>
                                                {(() => {
                                                    const calculateDuration = () => {
                                                        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                                                        const startM = months.indexOf(item.startMonth);
                                                        const startY = parseInt(item.startYear);
                                                        if (item.isCurrent) {
                                                            const now = new Date();
                                                            const endM = now.getMonth();
                                                            const endY = now.getFullYear();
                                                            const totalMonths = (endY - startY) * 12 + (endM - startM) + 1;
                                                            if (totalMonths <= 0) return '';
                                                            const years = Math.floor(totalMonths / 12);
                                                            const monthsLeft = totalMonths % 12;
                                                            if (years === 0) return `${totalMonths} month${totalMonths !== 1 ? 's' : ''}`;
                                                            if (monthsLeft === 0) return `${years} year${years !== 1 ? 's' : ''}`;
                                                            return `${years} year${years !== 1 ? 's' : ''} ${monthsLeft} month${monthsLeft !== 1 ? 's' : ''}`;
                                                        } else {
                                                            const endM = item.endMonth ? months.indexOf(item.endMonth) : 0;
                                                            const endY = parseInt(item.endYear);
                                                            if (isNaN(endY)) return item.duration || '';
                                                            const totalMonths = (endY - startY) * 12 + (endM - startM) + 1;
                                                            if (totalMonths <= 0) return '';
                                                            const years = Math.floor(totalMonths / 12);
                                                            const monthsLeft = totalMonths % 12;
                                                            if (years === 0) return `${totalMonths} month${totalMonths !== 1 ? 's' : ''}`;
                                                            if (monthsLeft === 0) return `${years} year${years !== 1 ? 's' : ''}`;
                                                            return `${years} year${years !== 1 ? 's' : ''} ${monthsLeft} month${monthsLeft !== 1 ? 's' : ''}`;
                                                        }
                                                    };
                                                    return <div className="text-xs text-gray-500">{calculateDuration()}</div>;
                                                })()}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800/50 flex items-center justify-center">
                                                <FaMapMarkerAlt className="text-gray-400 text-sm sm:text-base" />
                                            </div>
                                            <div>
                                                <div className="text-xs sm:text-sm text-gray-400">Location</div>
                                                <div className="font-medium text-gray-200 text-sm sm:text-base">
                                                    {item.location}
                                                </div>
                                            </div>
                                        </div>

                                        {item.grade && (
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800/50 flex items-center justify-center">
                                                    <FaAward className="text-gray-400 text-sm sm:text-base" />
                                                </div>
                                                <div>
                                                    <div className="text-xs sm:text-sm text-gray-400">Grade</div>
                                                    <div className="font-medium text-gray-200 text-sm sm:text-base">
                                                        {item.grade}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

{activeTab === 'experience' && (
                                        <>
                                            {(item.overview || item.description) && (
                                                <div className="mb-6">
                                                    <h4 className="text-base sm:text-lg font-semibold text-gray-200 mb-3">Overview</h4>
                                                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{item.overview || item.description}</p>
                                                </div>
                                            )}

                                            {item.projects?.length > 0 && (
                                                <div className="mb-6">
                                                    <h4 className="text-base sm:text-lg font-semibold text-gray-200 mb-4">Projects</h4>
                                                    <div className="space-y-4">
                                                        {item.projects.map((project, pIdx) => (
                                                            <div key={pIdx} className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
                                                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                                    <span className="text-lg font-semibold text-gray-200">{project.projectName || project.name}</span>
                                                                    {(project.cloudName || project.cloud) && (
                                                                        <span className="px-2 py-0.5 rounded-full bg-highlight/20 text-highlight text-xs">
                                                                            {project.cloudName || project.cloud}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                {project.description && <p className="text-gray-300 text-sm mb-3">{project.description}</p>}
                                                                {project.responsibilities && project.responsibilities.length > 0 && (
                                                                    <div className="mb-2">
                                                                        <div className="text-xs text-gray-400 mb-1">Key Responsibilities:</div>
                                                                        <ul className="space-y-1">
                                                                            {project.responsibilities.map((resp, rIdx) => (
                                                                                <li key={rIdx} className="flex items-start gap-2 text-gray-300 text-sm">
                                                                                    <FaChevronRight className="text-secondary mt-0.5 flex-shrink-0 w-3 h-3" />
                                                                                    <span>{resp}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {item.responsibilities && item.responsibilities.length > 0 && (
                                                <div className="mb-6">
                                                    <h4 className="text-base sm:text-lg font-semibold text-gray-200 mb-3">Key Responsibilities</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {item.responsibilities.map((responsibility, idx) => (
                                                            <div key={idx} className="flex items-start gap-3">
                                                                <FaChevronRight className="text-secondary mt-1 flex-shrink-0" />
                                                                <span className="text-gray-300 text-sm sm:text-base">{responsibility}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {item.technologies && item.technologies.length > 0 && (
                                                <div className="mb-6">
                                                    <h4 className="text-base sm:text-lg font-semibold text-gray-200 mb-3">Technologies Used</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.technologies.map((tech, idx) => (
                                                            <span key={idx} className="cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-800/60 text-gray-200 text-xs sm:text-sm hover:text-highlight transition-colors">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {activeTab === 'education' && (
                                        <div className="space-y-6 mb-6">
                                            <div>
                                                <h4 className="text-base sm:text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
                                                    <FaGraduationCap className="text-secondary" />
                                                    Key Courses
                                                </h4>
                                                <div className="flex flex-wrap gap-x-6 gap-y-3">
                                                    {item.courses.map((course, idx) => (
                                                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                                                            <FaCode className="text-secondary/70 text-xs" />
                                                            <span>{course}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-base sm:text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
                                                    <FaAward className="text-secondary" />
                                                    Achievements
                                                </h4>
                                                <div className="flex flex-wrap gap-x-6 gap-y-3">
                                                    {item.achievements.map((achievement, idx) => (
                                                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                                                            <FaStar className="text-secondary/70 text-xs" />
                                                            <span>{achievement}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 rounded-3xl bg-gradient-to-r from-gray-900/50 to-background/30 backdrop-blur-sm border border-gray-800/50">
                        <div className="text-left">
                            <h3 className="text-2xl font-bold text-gray-200 mb-2">Detailed Professional Profile</h3>
                            <p className="text-gray-300">Download my complete resume for comprehensive details on projects, skills, and achievements</p>
                        </div>
                        <a
                            href={profile?.resume || "/assets/Aysha Akter Sumi_Software Developer.pdf"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer px-8 py-3 rounded-full bg-black text-primary font-bold-body text-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                            download
                        >
                            Download Resume
                            <FaExternalLinkAlt className="text-sm" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerPage;
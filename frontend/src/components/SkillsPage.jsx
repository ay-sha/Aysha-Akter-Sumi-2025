import React, { useEffect, useState } from "react";

import API_URL from '../config.js';

const defaultSkills = [
    { name: "ReactJS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "LWC", logo: "/lwc.svg" },
    { name: "APEX", logo: "/apex.svg" },
    { name: "Redux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "TailwindCSS", logo: "/tailwind-css-seeklogo.svg" },
    { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
    { name: "Material UI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" },
    { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "SOQL", logo: "https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/circle-stack.svg" },
    { name: "Flows", logo: "/flow.svg" },
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "C / C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Render", logo: "/render-seeklogo.svg" },
    { name: "Cloudinary", logo: "https://res.cloudinary.com/cloudinary/image/upload/v1591813967/cloudinary_logo_for_white_bg.svg" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

const SkillsPage = () => {
    const [grid, setGrid] = useState({ rows: 9, cols: 9 });
    const [skills, setSkills] = useState(defaultSkills);

    useEffect(() => {
        fetch(`API_URL/skills`)
            .then(res => res.json())
            .then(data => {
                if (data?.length) setSkills(data);
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        const updateGrid = () => {
            if (window.innerWidth < 640) {
                setGrid({ rows: 9, cols: 5 });
            } else if (window.innerWidth < 1024) {
                setGrid({ rows: 9, cols: 7 });
            } else {
                setGrid({ rows: 9, cols: 9 });
            }
        };
        updateGrid();
        window.addEventListener("resize", updateGrid);
        return () => window.removeEventListener("resize", updateGrid);
    }, []);

    let skillIndex = 0;

    return (
        <section id="skills" className="bg-background py-20 px-4 sm:px-6 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-px bg-gradient-to-r from-transparent via-highlight/40 to-transparent" />

            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-hero-bold">
                    Tools I Love & Work With
                </h2>
            </div>

            <div
                className={`
                    max-w-6xl mx-auto grid justify-items-center
                    ${grid.cols === 5 && "grid-cols-5"}
                    ${grid.cols === 7 && "grid-cols-7"}
                    ${grid.cols === 9 && "grid-cols-9"}
                `}
            >
                {Array.from({ length: grid.rows }).map((_, rowIndex) =>
                    Array.from({ length: grid.cols }).map((_, colIndex) => {
                        const isOddRow = rowIndex % 2 === 0;
                        const shouldPlace = isOddRow
                            ? colIndex % 2 !== 0
                            : colIndex % 2 === 0;

                        if (!shouldPlace || skillIndex >= skills.length) {
                            return <div key={`${rowIndex}-${colIndex}`} />;
                        }

                        const skill = skills[skillIndex++];

                        return (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className="
                                    group relative rounded-full bg-white
                                    w-14 h-14
                                    sm:w-18 sm:h-18
                                    md:w-20 md:h-20
                                    lg:w-24 lg:h-24
                                    flex items-center justify-center
                                    shadow-md
                                    transition-all duration-300 ease-out
                                    cursor-pointer
                                    hover:scale-110
                                    hover:shadow-[0_0_6px_rgba(99,102,241,0.45)]
                                    hover:ring-2 hover:ring-secondary/80
                                    animate-float
                                "
                                style={{ animationDelay: `${skillIndex * 0.12}s` }}
                            >
                                <img
                                    src={skill.logo}
                                    alt={skill.name}
                                    className="
                                        w-7 h-7
                                        sm:w-9 sm:h-9
                                        md:w-10 md:h-10
                                        lg:w-12 lg:h-12
                                        object-contain
                                        transition-transform duration-300
                                        group-hover:scale-110
                                    "
                                />

                                <span
                                    className="
                                        absolute -bottom-6
                                        hidden sm:block
                                        opacity-0 group-hover:opacity-100
                                        text-sm md:text-base
                                        font-medium text-primary
                                        transition-opacity
                                    "
                                >
                                    {skill.name}
                                </span>
                            </div>
                        );
                    })
                )}
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 6.5s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default SkillsPage;
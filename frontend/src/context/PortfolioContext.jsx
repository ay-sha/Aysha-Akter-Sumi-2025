import { createContext, useContext, useState, useEffect } from 'react';
import { FaCloud, FaUniversity, FaBriefcase } from 'react-icons/fa';

const PortfolioContext = createContext();

import API_URL from '../config.js';

const defaultProfile = {
    name: 'Aysha Akter Sumi',
    title: 'Software Engineer',
    description: 'Building Scalable, User-Centric Applications.',
    aboutDescription: [
        "I'm a software engineer with experience across full-stack development and enterprise systems. I focus on designing clean architectures, building reliable back-end logic, and creating intuitive front-end experiences.",
        "Currently, I work at Twinforce Solution Limited, contributing to large-scale applications used by hundreds of users."
    ],
    currentCompany: 'Twinforce Solution Limited',
    phone: '+8801884394630',
    email: 'ayshaaktersumi630@gmail.com',
    instagram: 'https://www.instagram.com/aysha__amin_',
    github: 'http://github.com/ay-sha',
    linkedin: 'http://www.linkedin.com/in/aysha-akter-sumi',
    resume: 'https://drive.google.com/your-resume-link'
};

const defaultExperiences = [
    { id: 1, position: 'Jr. Salesforce Developer', company: 'Twinforce Solution Limited', startMonth: 'November', startYear: '2025', endMonth: '', endYear: '', duration: 'Current', location: 'Dhaka, Bangladesh', type: 'Full-time', description: 'Leading development of enterprise Salesforce solutions.', responsibilities: ['Architected Car Dealership System', 'Built LWC components', 'Implemented APEX logic'], technologies: ['Salesforce APEX', 'LWC', 'SOQL'], achievements: ['Handle 1600+ transactions'], isCurrent: true, icon: 'FaCloud', color: 'from-secondary/10 to-secondary/30' },
    { id: 2, position: 'Salesforce Developer Intern', company: 'Twinforce Solution Limited', startMonth: 'August', startYear: '2025', endMonth: 'October', endYear: '2025', duration: '3 Months', location: 'Dhaka, Bangladesh', type: 'Internship', description: 'Hands-on Salesforce development.', responsibilities: ['Developed LWC', 'Implemented APEX'], technologies: ['Salesforce', 'APEX'], achievements: ['Production features'], isCurrent: false, icon: 'FaBriefcase', color: 'from-secondary/10 to-secondary/30' }
];

const defaultEducation = [
    { id: 1, degree: 'BSc in Computer Science & Engineering', institution: 'Daffodil International University', startMonth: 'January', startYear: '2020', endMonth: 'October', endYear: '2024', duration: '4 Years', location: 'Dhaka, Bangladesh', grade: 'CGPA: 3.93/4.00', achievements: ['Merit Scholarship'], courses: ['Data Structures', 'Database Systems'], icon: 'FaUniversity', color: 'from-secondary/10 to-secondary/30' }
];

export function PortfolioProvider({ children }) {
  const [profile, setProfile] = useState(defaultProfile);
  const [experiences, setExperiences] = useState(defaultExperiences);
  const [education, setEducation] = useState(defaultEducation);
  const [projects, setProjects] = useState([]);
  const [backendAvailable, setBackendAvailable] = useState(false);

  useEffect(() => {
    fetchFromBackend();
  }, []);

  const fetchFromBackend = async () => {
    try {
      const res = await fetch(`${API_URL}/profile`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.name) {
          setProfile(data);
          setBackendAvailable(true);
        }
      }
    } catch (e) {
      console.log('Using default profile');
    }

    try {
      const res = await fetch(`${API_URL}/projects`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) setProjects(data);
      }
    } catch (e) {
      console.log('Using default projects');
    }

    try {
      const res = await fetch(`${API_URL}/experiences`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setExperiences(data.map(exp => ({ ...exp, icon: exp.icon || 'FaBriefcase', color: exp.color || 'from-secondary/10 to-secondary/30' })));
        }
      }
    } catch (e) {
      console.log('Using default experiences');
    }

    try {
      const res = await fetch(`${API_URL}/education`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setEducation(data.map(edu => ({ ...edu, icon: edu.icon || 'FaUniversity', color: edu.color || 'from-secondary/10 to-secondary/30' })));
        }
      }
    } catch (e) {
      console.log('Using default education');
    }
  };

  const value = {
    profile,
    projects,
    experiences,
    education,
    loading: false,
    backendAvailable,
    refetch: fetchFromBackend
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
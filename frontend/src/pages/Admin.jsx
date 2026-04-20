import { useState, useRef, useEffect } from 'react';
import './Admin.css';

import API_URL from '../config.js';
const API = API_URL + '/api';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 20 }, (_, i) => currentYear - 15 + i);
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function Admin() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'Aysha Akter Sumi',
    title: 'Software Engineer',
    description: 'I work at the intersection of',
    heroHighlights: ['Web Application', 'Salesforce', 'Scalable Systems'],
    aboutHeadline: "I'm Aysha Akter Sumi, Building Scalable, User-Centric Applications.",
    aboutDescription: ["I'm a software engineer.", "Currently, I work at Twinforce."],
    aboutImage: '/assets/myPhoto.png',
    currentCompany: 'Twinforce Solution Limited',
    phone: '+8801884394630',
    email: 'ayshaaktersumi630@gmail.com',
    instagram: 'https://www.instagram.com/aysha__amin_',
    github: 'http://github.com/ay-sha',
    linkedin: 'http://www.linkedin.com/in/aysha-akter-sumi',
    resume: 'https://drive.google.com/your-resume-link'
  });

  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', technologies: '', category: 'fullstack', github: '', liveDemo: '', image: '', impact: '' });
  const [projectImage, setProjectImage] = useState(null);

  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({ 
    position: '', company: '', startMonth: '', startYear: '', endMonth: '', endYear: '', duration: '', location: '', type: 'Full-time', overview: '', responsibilities: '', projects: [], technologies: '', achievements: '', isCurrent: false 
  });
  const [newProjectForExp, setNewProjectForExp] = useState({ projectName: '', cloudName: '', description: '', responsibilities: '' });
  const [editingExperience, setEditingExperience] = useState(null);
  const [editExperienceData, setEditExperienceData] = useState({});

  const [education, setEducation] = useState([]);
  const [newEducation, setNewEducation] = useState({ degree: '', institution: '', startMonth: '', startYear: '', endMonth: '', endYear: '', duration: '', location: '', grade: '', achievements: '', courses: '', isCurrent: false });
  const [editingEducation, setEditingEducation] = useState(null);
  const [editEducationData, setEditEducationData] = useState({});
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', logo: '' });
  const [skillLogo, setSkillLogo] = useState(null);

  const handleSkillLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setSkillLogo(reader.result);
      setNewSkill({ ...newSkill, logo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const addSkill = () => {
    if (newSkill.name) {
      setSkills([...skills, { ...newSkill, _id: Date.now() }]);
      setNewSkill({ name: '', logo: '' });
      setSkillLogo(null);
      showMessage('Skill added!');
    }
  };

  const removeSkill = (id) => {
    setSkills(skills.filter(s => s._id !== id));
  };

  const saveSkills = async () => {
    if (skills.length === 0) {
      showMessage('No skills to save. Add skills first.');
      return;
    }
    setLoading(true);
    try {
      console.log('Saving skills:', skills);
      const res = await fetch(`${API}/skills`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skills)
      });
      const data = await res.json();
      console.log('Save response:', data);
      if (res.ok) {
        showMessage('Skills saved!');
        setSkills(data);
      } else {
        showMessage('Error: ' + JSON.stringify(data));
      }
    } catch (err) {
      showMessage('Error: ' + err.message);
    }
    setLoading(false);
  };

  const handleAboutLine1Change = (e) => setProfile({ ...profile, aboutDescription: [e.target.value, profile.aboutDescription[1]] });
  const handleAboutLine2Change = (e) => setProfile({ ...profile, aboutDescription: [profile.aboutDescription[0], e.target.value] });

  useEffect(() => {
    if (initialLoadDone) return;
    setInitialLoadDone(true);
    
    const loadData = async () => {
      setLoading(true);
      try {
        const [profileRes, projectsRes, experiencesRes, educationRes, skillsRes] = await Promise.all([
          fetch(`${API}/profile`),
          fetch(`${API}/projects`),
          fetch(`${API}/experiences`),
          fetch(`${API}/education`),
          fetch(`${API}/skills`)
        ]);
        
        const profileData = await profileRes.json();
        if (profileData) setProfile(prev => ({ ...prev, ...profileData }));
        
        const projectsData = await projectsRes.json();
        if (projectsData?.length) setProjects(projectsData);
        
        const experiencesData = await experiencesRes.json();
        if (experiencesData?.length) setExperiences(experiencesData);
        
        const educationData = await educationRes.json();
        if (educationData?.length) setEducation(educationData);
        
        const skillsData = await skillsRes.json();
        if (skillsData?.length) setSkills(skillsData);
      } catch (err) {
        console.error('Error loading data:', err);
      }
      setLoading(false);
    };
    
    loadData();
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProjectImage(reader.result);
      setNewProject({ ...newProject, image: reader.result });
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAboutImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, aboutImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      if (res.ok) showMessage('Profile saved!');
      else showMessage('Error saving profile');
    } catch (err) {
      showMessage('Error: ' + err.message);
    }
    setLoading(false);
  };

  const addProject = () => {
    if (newProject.title) {
      setProjects([...projects, { ...newProject, id: Date.now() }]);
      setNewProject({ title: '', description: '', technologies: '', category: 'fullstack', github: '', liveDemo: '', image: '', impact: '' });
      setProjectImage(null);
      showMessage('Project added!');
    }
  };

  const removeProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const saveProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/projects`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projects)
      });
      if (res.ok) showMessage('Projects saved!');
      else showMessage('Error saving projects');
    } catch (err) {
      showMessage('Error: ' + err.message);
    }
    setLoading(false);
  };

  const addExperience = () => {
    if (newExperience.position && newExperience.company) {
      const exp = { 
        ...newExperience, 
        id: Date.now(),
        overview: newExperience.overview || '',
        responsibilities: newExperience.responsibilities ? newExperience.responsibilities.split('\n').filter(r => r.trim()) : [],
        projects: newExperience.projects || [],
        technologies: newExperience.technologies ? newExperience.technologies.split(',').map(t => t.trim()) : [],
        achievements: newExperience.achievements ? newExperience.achievements.split('\n').filter(a => a.trim()) : [],
        duration: newExperience.isCurrent ? 'Current' : `${newExperience.endMonth} ${newExperience.endYear}`
      };
      setExperiences([exp, ...experiences]);
      setNewExperience({ position: '', company: '', startMonth: '', startYear: '', endMonth: '', endYear: '', duration: '', location: '', type: 'Full-time', overview: '', responsibilities: '', projects: [], technologies: '', achievements: '', isCurrent: false });
      setNewProjectForExp({ projectName: '', cloudName: '', description: '', responsibilities: '' });
      showMessage('Experience added!');
    } else {
      showMessage('Please fill position and company');
    }
  };

  const [editExpProjects, setEditExpProjects] = useState([]);
  const [editNewProject, setEditNewProject] = useState({ projectName: '', cloudName: '', description: '' });
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);
  const [editingProject, setEditingProject] = useState({});
  
  const openEditExperience = (exp) => {
    setEditingExperience(exp._id || exp.id);
    setEditExperienceData({
      ...exp,
      overview: exp.overview || '',
      responsibilities: exp.responsibilities?.join('\n') || '',
      projects: exp.projects || [],
      technologies: exp.technologies?.join(', ') || '',
      achievements: exp.achievements?.join('\n') || ''
    });
    setEditExpProjects(exp.projects || []);
    setEditNewProject({ projectName: '', cloudName: '', description: '', responsibilities: '' });
    setEditingProjectIndex(null);
  };

  const saveEditExperience = () => {
    setExperiences(experiences.map(e => {
      if ((e._id || e.id) === editingExperience) {
        return {
          ...editExperienceData,
          overview: editExperienceData.overview || '',
          responsibilities: editExperienceData.responsibilities ? editExperienceData.responsibilities.split('\n').filter(r => r.trim()) : [],
          projects: editExpProjects,
          technologies: editExperienceData.technologies ? editExperienceData.technologies.split(',').map(t => t.trim()) : [],
          achievements: editExperienceData.achievements ? editExperienceData.achievements.split('\n').filter(a => a.trim()) : [],
          duration: editExperienceData.isCurrent ? 'Current' : `${editExperienceData.endMonth} ${editExperienceData.endYear}`
        };
      }
      return e;
    }));
    setEditingExperience(null);
    setEditExperienceData({});
    setEditExpProjects([]);
    setEditingProjectIndex(null);
    setEditingProject({});
    showMessage('Experience updated!');
  };

  const removeExperience = (id) => {
    setExperiences(experiences.filter(e => (e._id || e.id) !== id));
  };

  const saveExperiences = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/experiences`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(experiences)
      });
      if (res.ok) showMessage('Experiences saved!');
      else showMessage('Error saving experiences');
    } catch (err) {
      showMessage('Error: ' + err.message);
    }
    setLoading(false);
  };

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      const edu = { 
        ...newEducation, 
        id: Date.now(),
        achievements: newEducation.achievements ? newEducation.achievements.split('\n').filter(a => a.trim()) : [],
        courses: newEducation.courses ? newEducation.courses.split(',').map(c => c.trim()) : [],
        duration: newEducation.isCurrent ? 'Currently Pursuing' : `${newEducation.startMonth} ${newEducation.startYear} - ${newEducation.endMonth} ${newEducation.endYear}`
      };
      setEducation([edu, ...education]);
      setNewEducation({ degree: '', institution: '', startMonth: '', startYear: '', endMonth: '', endYear: '', duration: '', location: '', grade: '', achievements: '', courses: '', isCurrent: false });
      showMessage('Education added!');
    } else {
      showMessage('Please fill degree and institution');
    }
  };

  const openEditEducation = (edu) => {
    setEditingEducation(edu._id || edu.id);
    setEditEducationData({
      ...edu,
      achievements: edu.achievements?.join('\n') || '',
      courses: edu.courses?.join(', ') || ''
    });
  };

  const saveEditEducation = () => {
    setEducation(education.map(e => {
      if ((e._id || e.id) === editingEducation) {
        return {
          ...editEducationData,
          achievements: editEducationData.achievements.split('\n').filter(a => a.trim()),
          courses: editEducationData.courses ? editEducationData.courses.split(',').map(c => c.trim()) : [],
          duration: editEducationData.isCurrent ? 'Currently Pursuing' : `${editEducationData.startMonth} ${editEducationData.startYear} - ${editEducationData.endMonth} ${editEducationData.endYear}`
        };
      }
      return e;
    }));
    setEditingEducation(null);
    setEditEducationData({});
    showMessage('Education updated!');
  };

  const removeEducation = (id) => {
    setEducation(education.filter(e => (e._id || e.id) !== id));
  };

  const saveEducation = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/education`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(education)
      });
      if (res.ok) showMessage('Education saved!');
      else showMessage('Error saving education');
    } catch (err) {
      showMessage('Error: ' + err.message);
    }
    setLoading(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'projects', label: 'Projects' },
    { id: 'experiences', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' }
  ];

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Portfolio Admin Panel</h1>
        <p>Edit your portfolio. Click Save to apply changes.</p>
      </div>
      
      {message && <div className="admin-message">{message}</div>}
      
      <div className="admin-tabs">
        {tabs.map(tab => (
          <button key={tab.id} className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="admin-content">
        {activeTab === 'profile' && (
          <div className="admin-section">
            <h2>Profile & Contact Info</h2>
            <div className="form-grid">
              <div className="form-group"><label>Name</label><input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} /></div>
              <div className="form-group"><label>Title</label><input type="text" value={profile.title} onChange={e => setProfile({...profile, title: e.target.value})} /></div>
              <div className="form-group full-width"><label>Hero Description</label><input type="text" value={profile.description} onChange={e => setProfile({...profile, description: e.target.value})} /></div>
              <div className="form-group"><label>Highlight 1</label><input type="text" value={profile.heroHighlights?.[0] || ''} onChange={e => setProfile({...profile, heroHighlights: [e.target.value, profile.heroHighlights?.[1] || '', profile.heroHighlights?.[2] || '']})} /></div>
              <div className="form-group"><label>Highlight 2</label><input type="text" value={profile.heroHighlights?.[1] || ''} onChange={e => setProfile({...profile, heroHighlights: [profile.heroHighlights?.[0] || '', e.target.value, profile.heroHighlights?.[2] || '']})} /></div>
              <div className="form-group"><label>Highlight 3</label><input type="text" value={profile.heroHighlights?.[2] || ''} onChange={e => setProfile({...profile, heroHighlights: [profile.heroHighlights?.[0] || '', profile.heroHighlights?.[1] || '', e.target.value]})} /></div>
              <div className="form-group full-width"><label>About Headline (Green Bold)</label><input type="text" value={profile.aboutHeadline || ''} onChange={e => setProfile({...profile, aboutHeadline: e.target.value})} /></div>
              <div className="form-group full-width"><label>About (Line 1)</label><textarea value={profile.aboutDescription[0]} onChange={handleAboutLine1Change} /></div>
              <div className="form-group full-width"><label>About (Line 2)</label><textarea value={profile.aboutDescription[1]} onChange={handleAboutLine2Change} /></div>
              <div className="form-group full-width">
                <label>About Image (URL or upload)</label>
                <input type="text" value={profile.aboutImage || ''} onChange={e => setProfile({...profile, aboutImage: e.target.value})} placeholder="Paste image URL here" />
                <div style={{display:'flex', gap:10, marginTop:8}}>
                  <label className="upload-btn">
                    Upload from Device
                    <input type="file" accept="image/*" onChange={handleAboutImageUpload} style={{display:'none'}} />
                  </label>
                  {profile.aboutImage && (
                    <button type="button" className="preview-btn" onClick={() => window.open(profile.aboutImage, '_blank')}>Preview</button>
                  )}
                </div>
              </div>
              <div className="form-group"><label>Current Company</label><input type="text" value={profile.currentCompany} onChange={e => setProfile({...profile, currentCompany: e.target.value})} /></div>
              <div className="form-group"><label>Phone</label><input type="text" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} /></div>
              <div className="form-group"><label>Email</label><input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} /></div>
              <div className="form-group"><label>Resume Link (Google Drive)</label><input type="text" value={profile.resume} onChange={e => setProfile({...profile, resume: e.target.value})} placeholder="https://drive.google.com/..." /></div>
              <div className="form-group"><label>Instagram URL</label><input type="url" value={profile.instagram} onChange={e => setProfile({...profile, instagram: e.target.value})} /></div>
              <div className="form-group"><label>GitHub URL</label><input type="url" value={profile.github} onChange={e => setProfile({...profile, github: e.target.value})} /></div>
              <div className="form-group"><label>LinkedIn URL</label><input type="url" value={profile.linkedin} onChange={e => setProfile({...profile, linkedin: e.target.value})} /></div>
            </div>
            <button className="save-btn" onClick={saveProfile} disabled={loading}>{loading ? 'Saving...' : 'Save Profile'}</button>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="admin-section">
            <h2>Projects</h2>
            <div className="add-form">
              <input type="text" placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} />
              <input type="text" placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
              <input type="text" placeholder="Technologies (comma separated)" value={newProject.technologies} onChange={e => setNewProject({...newProject, technologies: e.target.value})} />
              <select value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})}>
                <option value="frontend">Frontend</option>
                <option value="fullstack">Full Stack</option>
                <option value="salesforce">Salesforce</option>
                <option value="graphics">Graphics</option>
              </select>
              <div className="form-group full-width">
                <label>Project Image</label>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} />
                {projectImage && <img src={projectImage} alt="Preview" style={{width: 100, height: 100, objectFit: 'cover', marginTop: 10, borderRadius: 8}} />}
              </div>
              <input type="text" placeholder="GitHub URL" value={newProject.github} onChange={e => setNewProject({...newProject, github: e.target.value})} />
              <input type="text" placeholder="Live Demo URL" value={newProject.liveDemo} onChange={e => setNewProject({...newProject, liveDemo: e.target.value})} />
              <input type="text" placeholder="Impact" value={newProject.impact} onChange={e => setNewProject({...newProject, impact: e.target.value})} />
              <button onClick={addProject} disabled={uploading}>{uploading ? 'Uploading...' : 'Add Project'}</button>
            </div>
            <div className="item-list">
              {projects.map(project => (
                <div key={project.id} className="item">
                  <div><span style={{fontWeight:'bold'}}>{project.title}</span><span style={{marginLeft:10, color:'#9ca3af'}}>{project.category}</span></div>
                  <button onClick={() => removeProject(project.id)}>Remove</button>
                </div>
              ))}
            </div>
            <button className="save-btn" onClick={saveProjects} disabled={loading}>{loading ? 'Saving...' : 'Save All Projects'}</button>
          </div>
        )}

        {activeTab === 'experiences' && (
          <div className="admin-section">
            <h2>Work Experience</h2>
            <div className="add-form">
              <input type="text" placeholder="Position *" value={newExperience.position} onChange={e => setNewExperience({...newExperience, position: e.target.value})} />
              <input type="text" placeholder="Company *" value={newExperience.company} onChange={e => setNewExperience({...newExperience, company: e.target.value})} />
              <div className="form-row">
                <div className="form-group"><label>Start Month</label><select value={newExperience.startMonth} onChange={e => setNewExperience({...newExperience, startMonth: e.target.value})}><option value="">Select</option>{months.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
                <div className="form-group"><label>Start Year</label><select value={newExperience.startYear} onChange={e => setNewExperience({...newExperience, startYear: e.target.value})}><option value="">Select</option>{years.map(y => <option key={y} value={y}>{y}</option>)}</select></div>
                <div className="form-group"><label>Job Type</label><select value={newExperience.type} onChange={e => setNewExperience({...newExperience, type: e.target.value})}><option value="Full-time">Full-time</option><option value="Internship">Internship</option><option value="Part-time">Part-time</option><option value="Contract">Contract</option><option value="Freelance">Freelance</option></select></div>
              </div>
              <div className="form-row">
                <div className="checkbox-group"><input type="checkbox" checked={newExperience.isCurrent} onChange={e => setNewExperience({...newExperience, isCurrent: e.target.checked})} /><label>Currently Working</label></div>
                {!newExperience.isCurrent && (<><div className="form-group"><label>End Month</label><select value={newExperience.endMonth} onChange={e => setNewExperience({...newExperience, endMonth: e.target.value})}><option value="">Select</option>{months.map(m => <option key={m} value={m}>{m}</option>)}</select></div><div className="form-group"><label>End Year</label><select value={newExperience.endYear} onChange={e => setNewExperience({...newExperience, endYear: e.target.value})}><option value="">Select</option>{years.map(y => <option key={y} value={y}>{y}</option>)}</select></div></>)}
              </div>
              <input type="text" placeholder="Location" value={newExperience.location} onChange={e => setNewExperience({...newExperience, location: e.target.value})} />
              <textarea placeholder="Overview (role summary)" value={newExperience.overview || ''} onChange={e => setNewExperience({...newExperience, overview: e.target.value})} />
              
              <h4>Job Key Responsibilities (one per line, shown if no projects)</h4>
              <textarea placeholder="Key Responsibilities (one per line)" value={newExperience.responsibilities || ''} onChange={e => setNewExperience({...newExperience, responsibilities: e.target.value})} />
              
              <h4>Projects (add multiple)</h4>
              <div className="project-form">
                <input type="text" placeholder="Project Name" value={newProjectForExp.projectName || ''} onChange={e => setNewProjectForExp({...newProjectForExp, projectName: e.target.value})} />
                <input type="text" placeholder="Cloud Name (e.g., Sales Cloud)" value={newProjectForExp.cloudName || ''} onChange={e => setNewProjectForExp({...newProjectForExp, cloudName: e.target.value})} />
                <textarea placeholder="Project Description" value={newProjectForExp.description || ''} onChange={e => setNewProjectForExp({...newProjectForExp, description: e.target.value})} />
                <textarea placeholder="Responsibilities (one per line)" value={newProjectForExp.responsibilities || ''} onChange={e => setNewProjectForExp({...newProjectForExp, responsibilities: e.target.value})} />
                <button type="button" onClick={() => {
                  if (newProjectForExp.projectName) {
                    const newProjects = [...(newExperience.projects || []), { ...newProjectForExp, responsibilities: newProjectForExp.responsibilities.split('\n').filter(r => r.trim()) }];
                    setNewExperience({...newExperience, projects: newProjects});
                    setNewProjectForExp({ projectName: '', cloudName: '', description: '', responsibilities: '' });
                  }
                }}>+ Add Project</button>
                {newExperience.projects?.length > 0 && (
                  <div className="added-projects">
                    {newExperience.projects.map((p, i) => (
                      <div key={i} className="added-project">
                        <span>{p.projectName} ({p.cloudName})</span>
                        <button type="button" onClick={() => setNewExperience({...newExperience, projects: newExperience.projects.filter((_, idx) => idx !== i)})}>×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <input type="text" placeholder="Technologies (comma separated)" value={newExperience.technologies} onChange={e => setNewExperience({...newExperience, technologies: e.target.value})} />
              <button onClick={addExperience}>Add Experience</button>
            </div>
            <div className="item-list">
              {experiences.map(exp => (
                <div key={exp._id || exp.id} className="item">
                  <div>
                    <span style={{fontWeight:'bold'}}>{exp.position}</span>
                    <span style={{marginLeft:10, color:'#9ca3af'}}>@ {exp.company}</span>
                    {exp.isCurrent && <span style={{marginLeft:10, color:'#22c55e'}}>Current</span>}
                  </div>
                  <div style={{display:'flex', gap:5}}>
                    <button onClick={() => openEditExperience(exp)}>Edit</button>
                    <button onClick={() => removeExperience(exp._id || exp.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            {editingExperience && (
              <div className="edit-form">
                <h3>Edit Experience</h3>
                <input type="text" placeholder="Position" value={editExperienceData.position || ''} onChange={e => setEditExperienceData({...editExperienceData, position: e.target.value})} />
                <input type="text" placeholder="Company" value={editExperienceData.company || ''} onChange={e => setEditExperienceData({...editExperienceData, company: e.target.value})} />
                <div className="form-row">
                  <div className="form-group"><label>Start Month</label><select value={editExperienceData.startMonth || ''} onChange={e => setEditExperienceData({...editExperienceData, startMonth: e.target.value})}><option value="">Select</option>{months.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
                  <div className="form-group"><label>Start Year</label><select value={editExperienceData.startYear || ''} onChange={e => setEditExperienceData({...editExperienceData, startYear: e.target.value})}><option value="">Select</option>{years.map(y => <option key={y} value={y}>{y}</option>)}</select></div>
                  <div className="form-group"><label>Job Type</label><select value={editExperienceData.type || 'Full-time'} onChange={e => setEditExperienceData({...editExperienceData, type: e.target.value})}><option value="Full-time">Full-time</option><option value="Internship">Internship</option><option value="Part-time">Part-time</option><option value="Contract">Contract</option><option value="Freelance">Freelance</option></select></div>
                </div>
                <div className="form-row">
                  <div className="checkbox-group"><input type="checkbox" checked={editExperienceData.isCurrent || false} onChange={e => setEditExperienceData({...editExperienceData, isCurrent: e.target.checked})} /><label>Currently Working</label></div>
                  {!editExperienceData.isCurrent && (<><div className="form-group"><label>End Month</label><select value={editExperienceData.endMonth || ''} onChange={e => setEditExperienceData({...editExperienceData, endMonth: e.target.value})}><option value="">Select</option>{months.map(m => <option key={m} value={m}>{m}</option>)}</select></div><div className="form-group"><label>End Year</label><select value={editExperienceData.endYear || ''} onChange={e => setEditExperienceData({...editExperienceData, endYear: e.target.value})}><option value="">Select</option>{years.map(y => <option key={y} value={y}>{y}</option>)}</select></div></>)}
                </div>
                <input type="text" placeholder="Location" value={editExperienceData.location || ''} onChange={e => setEditExperienceData({...editExperienceData, location: e.target.value})} />
                <textarea placeholder="Overview (role summary)" value={editExperienceData.overview || ''} onChange={e => setEditExperienceData({...editExperienceData, overview: e.target.value})} />
                
                <h4>Job Key Responsibilities (one per line, shown if no projects)</h4>
                <textarea placeholder="Key Responsibilities (one per line)" value={editExperienceData.responsibilities || ''} onChange={e => setEditExperienceData({...editExperienceData, responsibilities: e.target.value})} />
                
                <h4>Projects</h4>
                {editExpProjects?.length > 0 && (
                  <div className="added-projects">
                    {editExpProjects.map((p, i) => (
                      <div key={i} className="added-project">
                        {editingProjectIndex === i ? (
                          <div className="project-edit-form">
                            <input type="text" placeholder="Project Name" value={editingProject.projectName || ''} onChange={e => setEditingProject({...editingProject, projectName: e.target.value})} />
                            <input type="text" placeholder="Cloud Name (optional)" value={editingProject.cloudName || ''} onChange={e => setEditingProject({...editingProject, cloudName: e.target.value})} />
                            <textarea placeholder="Description" value={editingProject.description || ''} onChange={e => setEditingProject({...editingProject, description: e.target.value})} />
                            <textarea placeholder="Key Responsibilities (one per line)" value={editingProject.responsibilities?.join('\n') || ''} onChange={e => setEditingProject({...editingProject, responsibilities: e.target.value.split('\n').filter(r => r.trim())})} />
                            <div style={{display:'flex', gap:10}}>
                              <button type="button" onClick={() => {
                                const updated = [...editExpProjects];
                                updated[i] = editingProject;
                                setEditExpProjects(updated);
                                setEditingProjectIndex(null);
                              }}>Save</button>
                              <button type="button" onClick={() => setEditingProjectIndex(null)}>Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div className="project-edit-item">
                            <div className="project-info" onClick={() => { setEditingProject(p); setEditingProjectIndex(i); }}>
                              <strong>{p.projectName}</strong>
                              {p.cloudName ? <span className="cloud-tag">{p.cloudName}</span> : null}
                            </div>
                            <button type="button" className="edit-btn" onClick={() => { setEditingProject(p); setEditingProjectIndex(i); }}>Edit</button>
                            <button type="button" className="remove-btn" onClick={() => setEditExpProjects(editExpProjects.filter((_, idx) => idx !== i))}>×</button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="project-form">
                  <input type="text" placeholder="Project Name" value={editNewProject?.projectName || ''} onChange={e => setEditNewProject({...editNewProject, projectName: e.target.value})} />
                  <input type="text" placeholder="Cloud/Stack Name (optional)" value={editNewProject?.cloudName || ''} onChange={e => setEditNewProject({...editNewProject, cloudName: e.target.value})} />
                  <textarea placeholder="Description" value={editNewProject?.description || ''} onChange={e => setEditNewProject({...editNewProject, description: e.target.value})} />
                  <textarea placeholder="Key Responsibilities (one per line)" value={editNewProject?.responsibilities || ''} onChange={e => setEditNewProject({...editNewProject, responsibilities: e.target.value})} />
                  <button type="button" onClick={() => {
                    if (editNewProject?.projectName) {
                      setEditExpProjects([...editExpProjects, { ...editNewProject, responsibilities: editNewProject.responsibilities?.split('\n').filter(r => r.trim()) || [] }]);
                      setEditNewProject({ projectName: '', cloudName: '', description: '' });
                    }
                  }}>+ Add Project</button>
                </div>
                
                <input type="text" placeholder="Technologies (comma separated)" value={editExperienceData.technologies || ''} onChange={e => setEditExperienceData({...editExperienceData, technologies: e.target.value})} />
                <div style={{display:'flex', gap:10, marginTop:10}}>
                  <button onClick={saveEditExperience}>Save Changes</button>
                  <button onClick={() => { setEditingExperience(null); setEditExpProjects([]); setEditNewProject({ projectName: '', cloudName: '', description: '' }); setEditingProjectIndex(null); }}>Cancel</button>
                </div>
              </div>
            )}
            <button className="save-btn" onClick={saveExperiences} disabled={loading}>{loading ? 'Saving...' : 'Save All Experiences'}</button>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="admin-section">
            <h2>Education</h2>
            <div className="add-form">
              <input type="text" placeholder="Degree *" value={newEducation.degree} onChange={e => setNewEducation({...newEducation, degree: e.target.value})} />
              <input type="text" placeholder="Institution *" value={newEducation.institution} onChange={e => setNewEducation({...newEducation, institution: e.target.value})} />
              <div className="form-group"><label>Start Month</label><select value={newEducation.startMonth} onChange={e => setNewEducation({...newEducation, startMonth: e.target.value})}><option value="">Select</option>{months.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
              <div className="form-group"><label>Start Year</label><select value={newEducation.startYear} onChange={e => setNewEducation({...newEducation, startYear: e.target.value})}><option value="">Select</option>{years.map(y => <option key={y} value={y}>{y}</option>)}</select></div>
              <div className="checkbox-group"><input type="checkbox" checked={newEducation.isCurrent} onChange={e => setNewEducation({...newEducation, isCurrent: e.target.checked})} /><label>Currently Pursuing</label></div>
              {!newEducation.isCurrent && (<><div className="form-group"><label>End Month</label><select value={newEducation.endMonth} onChange={e => setNewEducation({...newEducation, endMonth: e.target.value})}><option value="">Select</option>{months.map(m => <option key={m} value={m}>{m}</option>)}</select></div><div className="form-group"><label>End Year</label><select value={newEducation.endYear} onChange={e => setNewEducation({...newEducation, endYear: e.target.value})}><option value="">Select</option>{years.map(y => <option key={y} value={y}>{y}</option>)}</select></div></>)}
              <input type="text" placeholder="Location" value={newEducation.location} onChange={e => setNewEducation({...newEducation, location: e.target.value})} />
              <input type="text" placeholder="Grade (e.g., CGPA: 3.93/4.00)" value={newEducation.grade} onChange={e => setNewEducation({...newEducation, grade: e.target.value})} />
              <input type="text" placeholder="Courses (comma separated)" value={newEducation.courses} onChange={e => setNewEducation({...newEducation, courses: e.target.value})} />
              <button onClick={addEducation}>Add Education</button>
            </div>
            <div className="item-list">
              {education.map(edu => (
                <div key={edu._id || edu.id} className="item">
                  <div>
                    <span style={{fontWeight:'bold'}}>{edu.degree}</span>
                    <span style={{marginLeft:10, color:'#9ca3af'}}>@ {edu.institution}</span>
                    {edu.isCurrent && <span style={{marginLeft:10, color:'#22c55e'}}>Pursuing</span>}
                  </div>
                  <div style={{display:'flex', gap:5}}>
                    <button onClick={() => openEditEducation(edu)}>Edit</button>
                    <button onClick={() => removeEducation(edu._id || edu.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            {editingEducation && (
              <div className="edit-form">
                <h3>Edit Education</h3>
                <input type="text" placeholder="Degree" value={editEducationData.degree || ''} onChange={e => setEditEducationData({...editEducationData, degree: e.target.value})} />
                <input type="text" placeholder="Institution" value={editEducationData.institution || ''} onChange={e => setEditEducationData({...editEducationData, institution: e.target.value})} />
                <div className="form-group"><label>Start Month</label><select value={editEducationData.startMonth || ''} onChange={e => setEditEducationData({...editEducationData, startMonth: e.target.value})}><option value="">Select</option>{months.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
                <div className="form-group"><label>Start Year</label><select value={editEducationData.startYear || ''} onChange={e => setEditEducationData({...editEducationData, startYear: e.target.value})}><option value="">Select</option>{years.map(y => <option key={y} value={y}>{y}</option>)}</select></div>
                <div className="checkbox-group"><input type="checkbox" checked={editEducationData.isCurrent || false} onChange={e => setEditEducationData({...editEducationData, isCurrent: e.target.checked})} /><label>Currently Pursuing</label></div>
                {!editEducationData.isCurrent && (<><div className="form-group"><label>End Month</label><select value={editEducationData.endMonth || ''} onChange={e => setEditEducationData({...editEducationData, endMonth: e.target.value})}><option value="">Select</option>{months.map(m => <option key={m} value={m}>{m}</option>)}</select></div><div className="form-group"><label>End Year</label><select value={editEducationData.endYear || ''} onChange={e => setEditEducationData({...editEducationData, endYear: e.target.value})}><option value="">Select</option>{years.map(y => <option key={y} value={y}>{y}</option>)}</select></div></>)}
                <input type="text" placeholder="Location" value={editEducationData.location || ''} onChange={e => setEditEducationData({...editEducationData, location: e.target.value})} />
                <input type="text" placeholder="Grade" value={editEducationData.grade || ''} onChange={e => setEditEducationData({...editEducationData, grade: e.target.value})} />
                <input type="text" placeholder="Courses (comma separated)" value={editEducationData.courses || ''} onChange={e => setEditEducationData({...editEducationData, courses: e.target.value})} />
                <div style={{display:'flex', gap:10, marginTop:10}}>
                  <button onClick={saveEditEducation}>Save Changes</button>
                  <button onClick={() => setEditingEducation(null)}>Cancel</button>
                </div>
              </div>
            )}
            <button className="save-btn" onClick={saveEducation} disabled={loading}>{loading ? 'Saving...' : 'Save All Education'}</button>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="admin-section">
            <h2>Skills</h2>
            <div className="add-form">
              <input type="text" placeholder="Skill Name *" value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} />
              <div className="form-group full-width">
                <label>Logo (Image URL or Upload)</label>
                <input type="file" accept="image/*" onChange={handleSkillLogoUpload} />
                {skillLogo && <img src={skillLogo} alt="Preview" style={{width: 50, height: 50, objectFit: 'contain', marginTop: 10}} />}
                <input type="text" placeholder="Or paste image URL" value={newSkill.logo} onChange={e => setNewSkill({...newSkill, logo: e.target.value})} style={{marginTop: 10}} />
              </div>
              <button onClick={addSkill}>Add Skill</button>
            </div>
            <div className="item-list">
              {skills.map(skill => (
                <div key={skill._id} className="item">
                  <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                    {skill.logo && <img src={skill.logo} alt={skill.name} style={{width: 30, height: 30, objectFit: 'contain'}} />}
                    <span style={{fontWeight: 'bold'}}>{skill.name}</span>
                  </div>
                  <button onClick={() => removeSkill(skill._id)}>Remove</button>
                </div>
              ))}
            </div>
            <button className="save-btn" onClick={saveSkills} disabled={loading}>{loading ? 'Saving...' : 'Save All Skills'}</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
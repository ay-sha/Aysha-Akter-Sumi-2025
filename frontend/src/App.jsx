import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroPage from './components/HeroPage'
import CustomCursor from './components/CustomCursor';
import AboutPage from './components/AboutPage';
import SkillsPage from './components/SkillsPage';
import ProjectsPage from './components/ProjectsPage';
import CareerPage from './components/CareerPage';
import ContactPage from './components/ContactPage';
import Admin from './pages/Admin';
import { usePortfolio } from './context/PortfolioContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Loading() {
  return (
    <div className="min-h-screen bg-[#161616] flex items-center justify-center">
      <div className="text-[#E3E5C4] text-2xl">Loading...</div>
    </div>
  );
}

function AdminProtected() {
const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetStep, setResetStep] = useState(0);
  const [resetMsg, setResetMsg] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('adminAuth');
    if (savedAuth === 'true') setAuthenticated(true);
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem('adminAuth', 'true');
        setAuthenticated(true);
        setError('');
      } else {
        setError('Incorrect username or password');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/admin/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail })
      });
      const data = await res.json();
      if (data.success) {
        setResetStep(1);
        setResetMsg('');
      } else {
        setResetMsg(data.error || 'Email not found');
      }
    } catch (err) {
      setResetMsg('Error verifying email');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/admin/reset-credentials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, newUsername, newPassword })
      });
      const data = await res.json();
      if (data.success) {
        setShowReset(false);
        setResetStep(0);
        setResetEmail('');
        setNewUsername('');
        setNewPassword('');
        alert('Credentials updated! Please login with new credentials.');
      } else {
        setResetMsg(data.error || 'Error resetting credentials');
      }
    } catch (err) {
      setResetMsg('Error resetting credentials');
    }
  };

  if (authenticated) {
    return <Admin />;
  }

  if (showReset) {
    return (
      <div className="min-h-screen bg-[#161616] flex items-center justify-center p-4">
        <div className="bg-[#1f1f1f] p-8 rounded-xl shadow-lg max-w-sm w-full">
          <h2 className="text-[#E3E5C4] text-2xl font-bold mb-6 text-center">Reset Credentials</h2>
          
          {resetStep === 0 && (
            <form onSubmit={handleVerifyEmail}>
              <p className="text-gray-400 mb-4 text-sm">Enter your account email to verify ownership</p>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Your email"
                className="w-full p-3 bg-[#262626] border border-[#333] rounded-lg text-[#e5e5e5] mb-4"
              />
              {resetMsg && <p className="text-red-500 mb-4 text-sm">{resetMsg}</p>}
              <button type="submit" className="w-full bg-[#7979EF] text-white py-3 rounded-lg font-semibold mb-3">
                Verify Email
              </button>
              <button type="button" onClick={() => { setShowReset(false); setResetStep(0); }} className="w-full text-gray-400 py-2">
                Back to Login
              </button>
            </form>
          )}
          
          {resetStep === 1 && (
            <form onSubmit={handleResetPassword}>
              <p className="text-gray-400 mb-4 text-sm">Email verified! Set new credentials</p>
              <input
                type="email"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="New Username (email)"
                className="w-full p-3 bg-[#262626] border border-[#333] rounded-lg text-[#e5e5e5] mb-4"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full p-3 bg-[#262626] border border-[#333] rounded-lg text-[#e5e5e5] mb-4"
              />
              {resetMsg && <p className="text-red-500 mb-4 text-sm">{resetMsg}</p>}
              <button type="submit" className="w-full bg-[#d1ff87] text-[#161616] py-3 rounded-lg font-semibold mb-3">
                Reset Credentials
              </button>
              <button type="button" onClick={() => { setShowReset(false); setResetStep(0); }} className="w-full text-gray-400 py-2">
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#161616] flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-[#1f1f1f] p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-[#E3E5C4] text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <input
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email"
          className="w-full p-3 bg-[#262626] border border-[#333] rounded-lg text-[#e5e5e5] mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 bg-[#262626] border border-[#333] rounded-lg text-[#e5e5e5] mb-4"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-[#d1ff87] text-[#161616] py-3 rounded-lg font-semibold hover:bg-[#b8e878] transition-colors"
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setShowReset(true)}
          className="w-full text-gray-400 py-2 text-sm mt-3"
        >
          Forgot Password?
        </button>
      </form>
    </div>
  );
}

function PortfolioContent() {
  const { loading } = usePortfolio();
  
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#161616] text-[#E3E5C4] relative overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <main>
        <section id="home">
          <HeroPage />
        </section>

        <section id="about">
          <AboutPage />
        </section>

        <section id="career">
          <CareerPage />
        </section>

        <section id="skills">
          <SkillsPage />
        </section>

        <section id="projects">
          <ProjectsPage />
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioContent />} />
      <Route path="/admin" element={<AdminProtected />} />
    </Routes>
  )
}

export default App
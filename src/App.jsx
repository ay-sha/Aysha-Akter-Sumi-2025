import './App.css'
import Navbar from './components/Navbar'
import HeroPage from './components/HeroPage'
import CustomCursor from './components/CustomCursor';
import AboutPage from './components/AboutPage';
import SkillsPage from './components/SkillsPage';
import ProjectsPage from './components/ProjectsPage';
import CareerPage from './components/CareerPage';
import ContactPage from './components/ContactPage';

function App() {

  return (
    <div className="bg-[#161616] text-[#E3E5C4] relative overflow-x-hidden">
    <CustomCursor />
    <Navbar />
    <HeroPage/>
    <AboutPage/>
    <CareerPage/>
    <SkillsPage/>
    <ProjectsPage/>
    </div>
  )
}

export default App

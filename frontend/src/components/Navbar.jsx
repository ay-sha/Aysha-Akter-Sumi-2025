import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const observerRef = useRef(null);

  const navItems = [
    { label: 'ABOUT', id: 'about' },
    { label: 'CAREER', id: 'career' },
    { label: 'SKILLS', id: 'skills' },
    { label: 'PROJECTS', id: 'projects' },
    { label: 'CONTACT', id: 'contact' },
  ];

  useEffect(() => {
    // 1. Setup Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id === 'home' ? '' : entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px', threshold: 0 }
    );

    // 2. Observe ALL sections including home and contact
    const idsToObserve = ['home', ...navItems.map(item => item.id)];
    idsToObserve.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current.disconnect();
  }, []); // Run once on mount

  const scrollTo = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const el = document.getElementById(id);
    if (!el) return;

    // Use window.scrollTo for better reliability with fixed navbars
    const offset = 80; // Your navbar height
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-primary/15">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" onClick={(e) => scrollTo(e, 'home')} className="text-xl font-semibold tracking-widest !text-primary">
          AYSHA
        </a>

        <div className="hidden md:flex gap-10">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollTo(e, item.id)}
              className={`relative text-base uppercase tracking-[0.2em] transition-colors duration-300 ${
                activeSection === item.id ? 'text-highlight' : 'text-primary/80 hover:text-accent'
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-[2px] transition-all duration-300 ${
                activeSection === item.id ? 'w-full bg-highlight' : 'w-0'
              }`} />
            </a>
          ))}
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-primary">
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-primary/15">
          <div className="flex flex-col gap-6 px-6 py-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollTo(e, item.id)}
                className={`text-sm uppercase tracking-[0.25em] transition-colors ${
                  activeSection === item.id ? 'text-highlight font-semibold' : 'text-primary/80 hover:text-accent'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile/tablet
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Don't show custom cursor on mobile
    if (isMobile) return;

    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', mouseMove);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .cursor-pointer');
    
    const mouseEnter = () => setCursorVariant('hover');
    const mouseLeave = () => setCursorVariant('default');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', mouseEnter);
      element.addEventListener('mouseleave', mouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', mouseEnter);
        element.removeEventListener('mouseleave', mouseLeave);
      });
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  // Cursor variants - Only white colors
  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(2px)',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: '2px solid rgba(255, 255, 255, 1)',
      //backdropFilter: 'blur(4px)',
      boxShadow: '0 0 20px rgba(255, 255, 255, 0.7)',
    }
  };

  // Don't render on mobile
  if (isMobile) return null;

  // Inside CustomCursor.jsx - Make sure the div is exactly this:
return (
  <motion.div
    className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
    variants={variants}
    animate={cursorVariant}
    style={{ position: 'fixed', pointerEvents: 'none' }} // Force it here too
    transition={{ type: 'spring', stiffness: 400, damping: 25, mass: 0.8 }}
  />
);
};

export default CustomCursor;
'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

// Animated Counter Component
const AnimatedCounter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const animation = animate(count, target, {
      duration: 2.5,
      delay: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth counting
    });

    const unsubscribe = rounded.onChange((latest) => {
      setDisplayValue(latest);
    });

    return () => {
      animation.stop();
      unsubscribe();
    };
  }, [count, target, rounded]);

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayValue}{suffix}
    </motion.span>
  );
};

const HeroSection = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  // Add Google Fonts to the document
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const toggleLightMode = () => {
    const newMode = !isLightMode;
    setIsLightMode(newMode);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('lightModeToggle', { 
        detail: { isLightMode: newMode } 
      }));
    }
  };

  return (
    <div 
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      {/* Theme Toggle */}
      <motion.button
        onClick={toggleLightMode}
        style={{
          position: 'fixed',
          top: '32px',
          right: '32px',
          zIndex: 50,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: isLightMode ? '#ffffff' : '#000000',
          color: isLightMode ? '#000000' : '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {isLightMode ? '☀️' : '🌙'}
      </motion.button>

      {/* Main Content */}
      <div style={{ maxWidth: '700px', position: 'relative', textAlign: 'center' }}>
        {/* Decorative Top Ornament */}
        <motion.div
          style={{
            textAlign: 'center',
            marginBottom: '15px',
            fontSize: '1.5rem',
            color: isLightMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          ◆ ◇ ◆
        </motion.div>

        <motion.h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            fontWeight: 500,
            margin: '0 auto',
            marginBottom: '0px',
            fontFamily: "'Cinzel', 'Times New Roman', serif",
            letterSpacing: '0.20em',
            color: '#ffffff',
            textShadow: isLightMode 
              ? '0 2px 8px rgba(0,0,0,0.3)'
              : '0 2px 12px rgba(0,0,0,0.4)',
            filter: isLightMode 
              ? 'drop-shadow(0 4px 16px rgba(0,0,0,0.2))'
              : 'drop-shadow(0 4px 20px rgba(0,0,0,0.4))',
            position: 'relative',
            zIndex: 1,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            display: 'block',
            textAlign: 'center',
            width: '100%',
          }}
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
        >
          LAKHI GROUP
        </motion.h1>
        
        {/* Elegant Divider */}
        <motion.div
          style={{
            height: '1px',
            width: '150px',
            margin: '0 auto 15px auto',
            background: isLightMode 
              ? 'linear-gradient(90deg, transparent, rgba(0,0,0,0.3), transparent)' 
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            position: 'relative',
          }}
          initial={{ width: 0 }}
          animate={{ width: '150px' }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          {/* Central Diamond */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '6px',
            height: '6px',
            background: isLightMode ? '#000000' : '#ffffff',
            transform: 'translate(-50%, -50%) rotate(45deg)',
          }} />
        </motion.div>

        <motion.p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            margin: 0,
            marginBottom: '25px',
            fontFamily: "'Cinzel', 'Times New Roman', serif",
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: '#cccccc',
            textShadow: isLightMode 
              ? '0 1px 3px rgba(0,0,0,0.2)'
              : '0 1px 4px rgba(0,0,0,0.3)',
            textAlign: 'center',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          Diamonds & Luxury
        </motion.p>

        {/* Elegant Quote */}
        <motion.div
          style={{
            textAlign: 'center',
            marginBottom: '25px',
            fontFamily: "'Cinzel', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
            color: isLightMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)',
            position: 'relative',
            padding: '0 30px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <span style={{ fontSize: '1.2rem', position: 'absolute', left: '0', top: '-3px' }}>&ldquo;</span>
          Excellence in Every Facet
          <span style={{ fontSize: '1.2rem', position: 'absolute', right: '0', bottom: '-8px' }}>&rdquo;</span>
        </motion.div>

        {/* Animated Stats Counters */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '20px',
            marginBottom: '30px',
            maxWidth: '500px',
            margin: '0 auto 30px auto',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          {/* Years of Experience */}
          <motion.div style={{ textAlign: 'center' }}>
            <motion.div
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 700,
                color: '#ffffff',
                fontFamily: "'Cinzel', serif",
                marginBottom: '5px',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.7 }}
            >
              <AnimatedCounter target={35} suffix="+" />
            </motion.div>
            <div style={{
              fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)',
              color: '#cccccc',
              fontFamily: "'Cinzel', serif",
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Years
            </div>
          </motion.div>

          {/* Global Clients */}
          <motion.div style={{ textAlign: 'center' }}>
            <motion.div
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 700,
                color: '#ffffff',
                fontFamily: "'Cinzel', serif",
                marginBottom: '5px',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.9 }}
            >
              <AnimatedCounter target={500} suffix="+" />
            </motion.div>
            <div style={{
              fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)',
              color: '#cccccc',
              fontFamily: "'Cinzel', serif",
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Clients
            </div>
          </motion.div>

          {/* Premium Collections */}
          <motion.div style={{ textAlign: 'center' }}>
            <motion.div
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 700,
                color: '#ffffff',
                fontFamily: "'Cinzel', serif",
                marginBottom: '5px',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 3.1 }}
            >
              <AnimatedCounter target={1000} suffix="+" />
            </motion.div>
            <div style={{
              fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)',
              color: '#cccccc',
              fontFamily: "'Cinzel', serif",
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Collections
            </div>
          </motion.div>
        </motion.div>

        <motion.button
          style={{
            padding: '14px 28px',
            borderRadius: '40px',
            border: '1px solid',
            borderColor: isLightMode ? '#333333' : '#888888',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: "'Cinzel', 'Times New Roman', serif",
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: isLightMode ? '#000000' : '#ffffff',
            color: isLightMode ? '#ffffff' : '#000000',
            boxShadow: isLightMode 
              ? '0 4px 16px rgba(0,0,0,0.2)'
              : '0 4px 20px rgba(0,0,0,0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.3 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: isLightMode 
              ? '0 6px 24px rgba(0,0,0,0.3)'
              : '0 6px 30px rgba(0,0,0,0.4)',
          }}
          whileTap={{ scale: 0.98 }}
        >
          Explore Collection
        </motion.button>

        {/* Decorative Bottom Ornament */}
        <motion.div
          style={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '1.2rem',
            color: isLightMode ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.5)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 3.8 }}
        >
          ◆ ◇ ◆
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;

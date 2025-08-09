"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Type definitions
interface NavItem {
  icon: string;
  href: string;
  submenu?: string[];
}

interface NavigationData {
  [key: string]: NavItem;
}

// Navigation menu data structure
const navigationData: NavigationData = {
  "Home": { icon: "🏠", href: "/" },
  "Pure Light": { 
    icon: "💎", 
    href: "/pure-light",
    submenu: ["Sustainability", "Our Responsibility", "The FootPrints"]
  },
  "Pure Commitment": { 
    icon: "🌿", 
    href: "/pure-commitment",
    submenu: ["Pure Purpose", "Pure Traceability"]
  },
  "Diamond": { 
    icon: "💍", 
    href: "/diamond",
    submenu: ["Pure Art", "Craftsmanship", "Pure Science", "SRK Grading System (SGS)", "Pure Transparency"]
  },
  "Jewelry": { 
    icon: "✨", 
    href: "/jewelry",
    submenu: ["Pure Luxury"]
  },
  "About SRK": { 
    icon: "🏢", 
    href: "/about",
    submenu: ["Pure Trust", "Membership", "Pure Alliances", "Facets of Timeless Excellence", "Pure Impact Stories"]
  },
  "Career": { 
    icon: "👥", 
    href: "/career",
    submenu: ["Pure Human Capital"]
  }
};

interface FloatingNavProps {
  className?: string;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ className = "" }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setActiveMenu(null);
    }
  };

  const handleMenuHover = (menuKey: string) => {
    setActiveMenu(menuKey);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };

  // Internal styles
  const navContainerStyle: React.CSSProperties = {
    position: 'fixed',
    top: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 50,
    background: 'rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '12px 24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  };

  const flexContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const mobileToggleStyle: React.CSSProperties = {
    display: 'block',
    padding: '8px',
    borderRadius: '8px',
    background: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const mobileToggleHoverStyle: React.CSSProperties = {
    ...mobileToggleStyle,
    background: 'rgba(255, 255, 255, 0.1)',
  };

  const desktopNavStyle: React.CSSProperties = {
    display: 'none',
    alignItems: 'center',
    gap: '4px',
  };

  const navItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: 'Cinzel, serif',
    cursor: 'pointer',
  };

  const navItemHoverStyle: React.CSSProperties = {
    ...navItemStyle,
    background: 'rgba(255, 255, 255, 0.1)',
  };

  const submenuStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: '0',
    marginTop: '8px',
    minWidth: '200px',
    background: 'rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
  };

  const submenuItemStyle: React.CSSProperties = {
    display: 'block',
    padding: '12px 16px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '13px',
    transition: 'all 0.3s ease',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const submenuItemHoverStyle: React.CSSProperties = {
    ...submenuItemStyle,
    background: 'rgba(255, 255, 255, 0.1)',
  };

  const mobileMenuStyle: React.CSSProperties = {
    display: 'block',
    position: 'absolute',
    top: '100%',
    left: '0',
    marginTop: '8px',
    width: '256px',
    background: 'rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    maxHeight: '70vh',
    overflowY: 'auto',
  };

  const mobileMenuItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
  };

  const mobileMenuItemHoverStyle: React.CSSProperties = {
    ...mobileMenuItemStyle,
    background: 'rgba(255, 255, 255, 0.1)',
  };

  const mobileSubmenuStyle: React.CSSProperties = {
    paddingLeft: '20px',
    background: 'rgba(255, 255, 255, 0.05)',
  };

  const mobileSubmenuItemStyle: React.CSSProperties = {
    display: 'block',
    padding: '8px 16px',
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    fontSize: '12px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    transition: 'all 0.3s ease',
  };

  const mobileSubmenuItemHoverStyle: React.CSSProperties = {
    ...mobileSubmenuItemStyle,
    background: 'rgba(255, 255, 255, 0.1)',
  };

  // Media query styles using CSS-in-JS
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media (min-width: 768px) {
        .desktop-nav { display: flex !important; }
        .mobile-toggle { display: none !important; }
        .mobile-menu { display: none !important; }
      }
      @media (max-width: 767px) {
        .desktop-nav { display: none !important; }
        .mobile-toggle { display: block !important; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={navContainerStyle}
      className={className}
    >
      <div style={flexContainerStyle}>
        {/* Mobile menu toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMenu}
          style={mobileToggleStyle}
          className="mobile-toggle"
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, mobileToggleHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, mobileToggleStyle)}
        >
          <span style={{ fontSize: '20px' }}>☰</span>
        </motion.button>

        {/* Desktop navigation */}
        <div style={desktopNavStyle} className="desktop-nav">
          {Object.entries(navigationData).map(([key, item]) => (
            <div
              key={key}
              style={{ position: 'relative' }}
              onMouseEnter={() => handleMenuHover(key)}
              onMouseLeave={handleMenuLeave}
            >
              <motion.a
                href={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={navItemStyle}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, navItemHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, navItemStyle)}
              >
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                <span>{key}</span>
                {item.submenu && (
                  <span style={{ fontSize: '12px', opacity: 0.7 }}>▼</span>
                )}
              </motion.a>

              {/* Submenu */}
              <AnimatePresence>
                {activeMenu === key && item.submenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={submenuStyle}
                  >
                    {item.submenu?.map((subItem: string, index: number) => (
                      <motion.a
                        key={subItem}
                        href={`${item.href}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        style={{
                          ...submenuItemStyle,
                          borderBottom: index < (item.submenu?.length || 0) - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                        }}
                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, submenuItemHoverStyle)}
                        onMouseLeave={(e) => Object.assign(e.currentTarget.style, {
                          ...submenuItemStyle,
                          borderBottom: index < (item.submenu?.length || 0) - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                        })}
                      >
                        {subItem}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Mobile navigation menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              style={mobileMenuStyle}
              className="mobile-menu"
            >
              {Object.entries(navigationData).map(([key, item], index) => (
                <div key={key}>
                  <motion.a
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={mobileMenuItemStyle}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, mobileMenuItemHoverStyle)}
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, mobileMenuItemStyle)}
                  >
                    <span style={{ fontSize: '16px' }}>{item.icon}</span>
                    <span>{key}</span>
                  </motion.a>
                  
                  {item.submenu && (
                    <div style={mobileSubmenuStyle}>
                      {item.submenu?.map((subItem: string, subIndex: number) => (
                        <motion.a
                          key={subItem}
                          href={`${item.href}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.05) + (subIndex * 0.03) }}
                          style={{
                            ...mobileSubmenuItemStyle,
                            borderBottom: subIndex < (item.submenu?.length || 0) - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
                          }}
                          onMouseEnter={(e) => Object.assign(e.currentTarget.style, mobileSubmenuItemHoverStyle)}
                          onMouseLeave={(e) => Object.assign(e.currentTarget.style, {
                            ...mobileSubmenuItemStyle,
                            borderBottom: subIndex < (item.submenu?.length || 0) - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
                          })}
                        >
                          {subItem}
                        </motion.a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
      style={{
        background: 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '12px 24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="flex items-center space-x-1">
        {/* Mobile menu toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          style={{ color: 'white' }}
        >
          <span style={{ fontSize: '20px' }}>☰</span>
        </motion.button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {Object.entries(navigationData).map(([key, item]) => (
            <div
              key={key}
              className="relative"
              onMouseEnter={() => handleMenuHover(key)}
              onMouseLeave={handleMenuLeave}
            >
              <motion.a
                href={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10"
                style={{ 
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  fontFamily: 'Cinzel, serif'
                }}
              >
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                <span>{key}</span>
                {item.submenu && (
                  <span style={{ fontSize: '12px', opacity: 0.7 }}>▼</span>
                )}
              </motion.a>

              {/* Submenu */}
              <AnimatePresence>
                {activeMenu === key && item.submenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 min-w-[200px]"
                    style={{
                      background: 'rgba(0, 0, 0, 0.9)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                      overflow: 'hidden'
                    }}
                  >
                    {item.submenu?.map((subItem: string, index: number) => (
                      <motion.a
                        key={subItem}
                        href={`${item.href}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="block px-4 py-3 hover:bg-white/10 transition-colors"
                        style={{
                          color: 'white',
                          textDecoration: 'none',
                          fontSize: '13px',
                          borderBottom: index < (item.submenu?.length || 0) - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                        }}
                      >
                        {subItem}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Mobile navigation menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 mt-2 w-64"
              style={{
                background: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(20px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                maxHeight: '70vh',
                overflowY: 'auto'
              }}
            >
              {Object.entries(navigationData).map(([key, item], index) => (
                <div key={key}>
                  <motion.a
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-white/10 transition-colors"
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '14px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>{item.icon}</span>
                    <span>{key}</span>
                  </motion.a>
                  
                  {item.submenu && (
                    <div style={{ paddingLeft: '20px', background: 'rgba(255, 255, 255, 0.05)' }}>
                      {item.submenu?.map((subItem: string, subIndex: number) => (
                        <motion.a
                          key={subItem}
                          href={`${item.href}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.05) + (subIndex * 0.03) }}
                          className="block px-4 py-2 hover:bg-white/10 transition-colors"
                          style={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            textDecoration: 'none',
                            fontSize: '12px',
                            borderBottom: subIndex < (item.submenu?.length || 0) - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
                          }}
                        >
                          {subItem}
                        </motion.a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default FloatingNav;

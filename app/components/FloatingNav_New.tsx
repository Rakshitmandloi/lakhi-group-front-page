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

// Navigation menu data structure with sophisticated SVG icons
const navigationData: NavigationData = {
  "Home": { 
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`, 
    href: "/" 
  },
  "Our Light": { 
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`, 
    href: "/our-light",
    submenu: ["Sustainability", "Our Responsibility", "The FootPrints"]
  },
  "Our Commitment": { 
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>`, 
    href: "/our-commitment",
    submenu: ["Our Purpose", "Our Traceability"]
  },
  "Diamond": { 
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2l2 4h8l2-4H6zM5 8l7 14 7-14H5z"/></svg>`, 
    href: "/diamond",
    submenu: ["Our Art", "Craftsmanship", "Our Science", "SRK Grading System (SGS)", "Our Transparency"]
  },
  "Jewelry": { 
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5h5.5l2 4h3L16 5h5l-2 11H5zm7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`, 
    href: "/jewelry",
    submenu: ["Our Luxury"]
  },
  "About Us": { 
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6C13.9 6 13 6.9 13 8V9C13 10.1 13.9 11 15 11H19V13H15L13 15H9L11 13V11C11 9.9 10.1 9 9 9H5V7L3 9V20H21V9Z"/></svg>`, 
    href: "/about",
    submenu: ["Our Trust", "Membership", "Our Alliances", "Facets of Timeless Excellence", "Our Impact Stories"]
  },
  "Career": { 
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-2V4c0-1.11-.89-2-2-2H8C6.89 2 6 2.89 6 4v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM8 4h8v2H8V4z"/></svg>`, 
    href: "/career",
    submenu: ["Our Human Capital"]
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

  // SVG Icon component
  const SvgIcon: React.FC<{ svgString: string }> = ({ svgString }) => (
    <span 
      dangerouslySetInnerHTML={{ __html: svgString }}
      style={{ display: 'inline-flex', alignItems: 'center' }}
    />
  );

  // Internal styles - all styling contained within component
  const navContainerStyle: React.CSSProperties = {
    position: 'fixed',
    top: '20px',
    left: '0',
    right: '0',
    margin: '0 auto',
    zIndex: 50,
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(25px) saturate(150%)',
    WebkitBackdropFilter: 'blur(25px) saturate(150%)',
    borderRadius: '30px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '12px 28px',
    boxShadow: `
      0 20px 60px rgba(0, 0, 0, 0.3),
      0 8px 25px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      inset 0 -1px 0 rgba(0, 0, 0, 0.1)
    `,
    width: 'fit-content',
    maxWidth: '90vw',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const flexContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    flexWrap: 'nowrap',
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
    fontSize: '20px',
  };

  const desktopNavStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    flexWrap: 'nowrap',
  };

  const navItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 20px',
    borderRadius: '18px',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    color: 'rgba(255, 255, 255, 0.95)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: 'Cinzel, serif',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    position: 'relative',
    overflow: 'hidden',
  };

  const submenuStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: '0',
    marginTop: '12px',
    minWidth: '220px',
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(20, 20, 30, 0.9) 100%)',
    backdropFilter: 'blur(30px) saturate(120%)',
    WebkitBackdropFilter: 'blur(30px) saturate(120%)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: `
      0 25px 70px rgba(0, 0, 0, 0.4),
      0 10px 30px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
    overflow: 'hidden',
  };

  const submenuItemStyle: React.CSSProperties = {
    display: 'block',
    padding: '14px 20px',
    color: 'rgba(255, 255, 255, 0.9)',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '400',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
  };

  const mobileMenuStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: '0',
    marginTop: '12px',
    width: '280px',
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(20, 20, 30, 0.9) 100%)',
    backdropFilter: 'blur(30px) saturate(120%)',
    WebkitBackdropFilter: 'blur(30px) saturate(120%)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: `
      0 25px 70px rgba(0, 0, 0, 0.4),
      0 10px 30px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
    maxHeight: '70vh',
    overflowY: 'auto',
  };

  const mobileMenuItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 20px',
    color: 'rgba(255, 255, 255, 0.9)',
    textDecoration: 'none',
    fontSize: '14px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
  };

  const mobileSubmenuStyle: React.CSSProperties = {
    paddingLeft: '24px',
    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
  };

  const mobileSubmenuItemStyle: React.CSSProperties = {
    display: 'block',
    padding: '10px 20px',
    color: 'rgba(255, 255, 255, 0.75)',
    textDecoration: 'none',
    fontSize: '12px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
  };

  // Media query styles using CSS-in-JS
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .floating-nav-container {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      
      .floating-nav-container:hover {
        transform: translateY(-2px);
        box-shadow: 
          0 25px 70px rgba(0, 0, 0, 0.35),
          0 12px 30px rgba(0, 0, 0, 0.18),
          inset 0 1px 0 rgba(255, 255, 255, 0.4),
          inset 0 -1px 0 rgba(0, 0, 0, 0.1) !important;
      }
      
      @media (min-width: 768px) {
        .floating-nav-desktop { 
          display: flex !important; 
          align-items: center !important;
          justify-content: center !important;
        }
        .floating-nav-mobile-toggle { display: none !important; }
      }
      @media (max-width: 767px) {
        .floating-nav-desktop { display: none !important; }
        .floating-nav-mobile-toggle { display: block !important; }
      }
      
      /* Custom scrollbar for mobile menu */
      .floating-nav-mobile-menu::-webkit-scrollbar {
        width: 4px;
      }
      .floating-nav-mobile-menu::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 2px;
      }
      .floating-nav-mobile-menu::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
      }
      .floating-nav-mobile-menu::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={navContainerStyle}
      className={`floating-nav-container ${className}`}
    >
      <div style={flexContainerStyle}>
        {/* Mobile menu toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMenu}
          style={mobileToggleStyle}
          className="floating-nav-mobile-toggle"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <span 
            dangerouslySetInnerHTML={{ 
              __html: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>` 
            }}
            style={{ display: 'inline-flex', alignItems: 'center' }}
          />
        </motion.button>

        {/* Desktop navigation */}
        <div style={desktopNavStyle} className="floating-nav-desktop">
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <SvgIcon svgString={item.icon} />
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
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(90deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)';
                          e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                          e.currentTarget.style.transform = 'translateX(0)';
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
              style={mobileMenuStyle}
              className="floating-nav-mobile-menu"
            >
              {Object.entries(navigationData).map(([key, item], index) => (
                <div key={key}>
                  <motion.a
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={mobileMenuItemStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(90deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <SvgIcon svgString={item.icon} />
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
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)';
                            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
                            e.currentTarget.style.transform = 'translateX(0)';
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

'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="navbar__inner">
        <a href="/" className="navbar__brand" aria-label="ZULOO Home">
          <Logo size={36} />
          <span className="navbar__name">ZULOO</span>
        </a>

        <div className={`navbar__links ${isOpen ? 'navbar__links--open' : ''}`}>
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a>
          <a href="#works" onClick={(e) => handleNavClick(e, 'works')}>Works</a>
          <a href="#testimonials" onClick={(e) => handleNavClick(e, 'testimonials')}>Reviews</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="navbar__cta">
            Let&apos;s Talk
          </a>
        </div>

        <button
          className={`navbar__burger ${isOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}

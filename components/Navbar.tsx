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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <a href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Logo size={36} />
          ZULOO
        </a>

        <div className="nav-links">
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a>
          <a href="#works" onClick={(e) => handleNavClick(e, 'works')}>Works</a>
          <a href="#testimonials" onClick={(e) => handleNavClick(e, 'testimonials')}>Reviews</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
            Let&apos;s Talk
          </a>
        </div>

        <button className={`hamburger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a>
        <a href="#works" onClick={(e) => handleNavClick(e, 'works')}>Works</a>
        <a href="#testimonials" onClick={(e) => handleNavClick(e, 'testimonials')}>Reviews</a>
        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="btn btn-primary">
          Let&apos;s Talk
        </a>
      </div>
    </nav>
  );
}

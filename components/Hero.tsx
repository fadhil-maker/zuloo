'use client';

import { useEffect, useRef } from 'react';

export default function Hero({ tagline }: { tagline?: string }) {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (blobRef.current) {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        blobRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section className="hero" id="hero">
      {/* Animated gradient blobs */}
      <div className="hero__blobs" ref={blobRef} aria-hidden="true">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__blob hero__blob--3" />
      </div>

      <div className="hero__content">
        <div className="hero__badge reveal">WEB DEVELOPMENT STUDIO</div>
        <h1 className="hero__title reveal">
          We build websites
          <br />
          <span className="hero__accent">that work.</span>
        </h1>
        <p className="hero__sub reveal">
          {tagline || 'Custom-crafted, mobile-first websites designed to grow your business. No templates. No shortcuts.'}
        </p>
        <div className="hero__actions reveal">
          <a href="#contact" className="btn btn--primary">
            Start Your Project
          </a>
          <a href="#works" className="btn btn--glass">
            See Our Work
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll reveal" aria-hidden="true">
          <div className="hero__scroll-line" />
          <span>SCROLL</span>
        </div>
      </div>
    </section>
  );
}

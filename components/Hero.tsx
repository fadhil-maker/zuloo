'use client';

export default function Hero({ tagline }: { tagline?: string }) {
  // Prevent repeating the headline if the DB tagline matches it
  const displayTagline = tagline && !tagline.toLowerCase().includes('we build websites that work') 
    ? tagline 
    : 'Custom-crafted, mobile-first websites designed to grow your business. No templates. No shortcuts.';

  return (
    <section className="hero" id="hero">
      <div className="blob"></div>
      <div className="container hero-content">
        <span className="text-accent h5-style" style={{ letterSpacing: '3px', marginBottom: '1.5rem', fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>WEB DEVELOPMENT STUDIO</span>
        <h1 style={{ marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 8vw, 5rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          We build websites
          <br />
          <span className="text-accent">that work.</span>
        </h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem', color: 'var(--text-secondary)' }}>
          {displayTagline}
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Start Your Project
          </a>
          <a href="#works" className="btn btn-glass" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            See Our Work
          </a>
        </div>
      </div>
    </section>
  );
}

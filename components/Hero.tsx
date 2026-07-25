'use client';

export default function Hero({ tagline }: { tagline?: string }) {
  return (
    <section className="hero" id="hero">
      <div className="blob"></div>
      <div className="container hero-content reveal">
        <h5 className="text-accent" style={{ letterSpacing: '2px', marginBottom: '1rem' }}>WEB DEVELOPMENT STUDIO</h5>
        <h1 style={{ marginBottom: '1.5rem' }}>
          We build websites
          <br />
          <span className="text-accent">that work.</span>
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          {tagline || 'Custom-crafted, mobile-first websites designed to grow your business. No templates. No shortcuts.'}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#contact" className="btn btn-primary">
            Start Your Project
          </a>
          <a href="#works" className="btn btn-glass">
            See Our Work
          </a>
        </div>
      </div>
    </section>
  );
}

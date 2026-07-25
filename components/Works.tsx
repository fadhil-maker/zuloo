'use client';

import { Work } from '@/lib/supabase';

export default function Works({ works }: { works: Work[] }) {
  if (!works.length) {
    return (
      <section className="portfolio container" id="works">
        <div className="text-center reveal">
          <h5 className="text-accent" style={{ letterSpacing: '2px' }}>PORTFOLIO</h5>
          <h2>Our Work</h2>
          <p>Projects launching soon. Stay tuned.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="portfolio container" id="works">
      <div className="text-center reveal" style={{ marginBottom: '3rem' }}>
        <h5 className="text-accent" style={{ letterSpacing: '2px' }}>PORTFOLIO</h5>
        <h2>Our Work</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          Real projects. Real results. See what we&apos;ve built.
        </p>
      </div>

      <div className="portfolio-grid">
        {works.map((work, i) => (
          <article
            key={work.id}
            className="portfolio-item reveal"
            style={{ transitionDelay: `${i * 0.12}s` }}
            onClick={() => work.live_url && window.open(work.live_url, '_blank')}
          >
            {work.image_url ? (
              <img
                src={work.image_url}
                alt={work.title}
                className="portfolio-img"
                loading="lazy"
              />
            ) : (
              <div className="portfolio-img" style={{ background: 'var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem' }}>🌐</span>
              </div>
            )}
            
            <div className="portfolio-overlay">
              <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>{work.title}</h3>
              <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '1rem' }}>{work.description}</p>
              
              {work.tags && work.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {work.tags.map((tag) => (
                    <span key={tag} style={{ background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', color: '#fff' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

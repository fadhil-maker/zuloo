'use client';

import { Work } from '@/lib/supabase';

export default function Works({ works }: { works: Work[] }) {
  if (!works.length) return null;

  return (
    <section className="portfolio container" id="works">
      <div className="text-center reveal" style={{ marginBottom: '5rem' }}>
        <h5 className="text-accent" style={{ letterSpacing: '2px' }}>PORTFOLIO</h5>
        <h2 style={{ fontSize: '3.5rem', marginTop: '0.5rem', fontWeight: 800 }}>Selected Works</h2>
      </div>

      <div className="portfolio-stack">
        {works.map((work, i) => (
          <div
            key={work.id}
            className="portfolio-card-wrapper reveal"
            style={{ 
              top: `calc(10vh + ${i * 40}px)`, 
              zIndex: i + 1 
            }}
          >
            <div className="portfolio-card">
              <div className="portfolio-content order-2 lg:order-1">
                <span className="text-accent" style={{ fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem', display: 'block', textTransform: 'uppercase' }}>
                  Project {String(i + 1).padStart(2, '0')}
                </span>
                <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.1, fontWeight: 800 }}>{work.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>{work.description}</p>
                
                {work.tags && work.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                    {work.tags.map((tag) => (
                      <span key={tag} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {work.live_url && (
                  <a href={work.live_url} target="_blank" rel="noopener noreferrer" className="portfolio-link-btn">
                    Live Demo ↗
                  </a>
                )}
              </div>
              
              <div className="portfolio-image-wrapper group order-1 lg:order-2">
                {work.image_url ? (
                  <img
                    src={work.image_url}
                    alt={work.title}
                    className="portfolio-img"
                    loading="lazy"
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '4rem', opacity: 0.5 }}>🌐</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

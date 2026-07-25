'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Work } from '@/lib/supabase';

export default function Works({ works }: { works: Work[] }) {
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack');
  const [hasToggled, setHasToggled] = useState(false);
  
  if (!works.length) return null;

  return (
    <section className="portfolio container" id="works">
      <div className="text-center reveal" style={{ marginBottom: '5rem' }}>
        <h5 className="text-accent" style={{ letterSpacing: '2px' }}>PORTFOLIO</h5>
        <h2 style={{ fontSize: '3.5rem', marginTop: '0.5rem', fontWeight: 800 }}>Selected Works</h2>
      </div>

      <div className="view-toggle-container">
        <button 
          onClick={() => { setViewMode('stack'); setHasToggled(true); }} 
          style={{ padding: '0.5rem 1.5rem', borderRadius: '30px', fontWeight: 'bold', background: viewMode === 'stack' ? 'var(--accent)' : 'var(--glass-bg)', color: viewMode === 'stack' ? '#FFF' : 'var(--text-primary)', border: '1px solid var(--glass-border)', cursor: 'pointer', transition: 'all 0.3s' }}
        >
          Stack View
        </button>
        <button 
          onClick={() => { setViewMode('grid'); setHasToggled(true); }} 
          style={{ padding: '0.5rem 1.5rem', borderRadius: '30px', fontWeight: 'bold', background: viewMode === 'grid' ? 'var(--accent)' : 'var(--glass-bg)', color: viewMode === 'grid' ? '#FFF' : 'var(--text-primary)', border: '1px solid var(--glass-border)', cursor: 'pointer', transition: 'all 0.3s' }}
        >
          Grid View
        </button>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid">
          {works.map((work, i) => (
            <article key={work.id} className={`glass-card reveal ${hasToggled ? 'active' : ''}`} style={{ transitionDelay: `${(i % 3) * 0.1}s`, display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1.5rem' }}>
              <div style={{ aspectRatio: '16/9', borderRadius: '1rem', overflow: 'hidden', background: 'var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {work.image_url ? (
                  <Image src={work.image_url} alt={work.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '3rem', opacity: 0.5 }}>🌐</span>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span className="text-accent" style={{ fontWeight: 'bold', letterSpacing: '1px', fontSize: '0.75rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Project {String(i + 1).padStart(2, '0')}
                </span>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 800 }}>{work.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>{work.description}</p>
                
                {work.live_url && (
                  <a href={work.live_url} target="_blank" rel="noopener noreferrer" className="portfolio-link-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                    Live Demo ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="portfolio-stack">
          {works.map((work, i) => (
            <div
              key={work.id}
              className={`portfolio-card-wrapper reveal ${hasToggled ? 'active' : ''}`}
              style={{ 
                top: `calc(15vh + ${i * 10}px)`, 
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
                        <span key={tag} style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
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
                    <Image
                      src={work.image_url}
                      alt={work.title}
                      className="portfolio-img"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
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
      )}
    </section>
  );
}

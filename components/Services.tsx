'use client';

import { useState } from 'react';
import { Service } from '@/lib/supabase';

export default function Services({ services }: { services: Service[] }) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  if (!services.length) return null;

  return (
    <section className="services container" id="services">
      <div className="text-center reveal" style={{ marginBottom: '3rem' }}>
        <h5 className="text-accent" style={{ letterSpacing: '2px' }}>WHAT WE DO</h5>
        <h2>Our Services</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          Everything you need to launch and grow your online presence.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', zIndex: 10, position: 'relative' }}>
        <button 
          onClick={() => setViewMode('grid')} 
          style={{ padding: '0.5rem 1.5rem', borderRadius: '30px', fontWeight: 'bold', background: viewMode === 'grid' ? 'var(--accent)' : 'var(--glass-bg)', color: viewMode === 'grid' ? '#000' : 'var(--text-primary)', border: '1px solid var(--glass-border)', cursor: 'pointer', transition: 'all 0.3s' }}
        >
          Grid View
        </button>
        <button 
          onClick={() => setViewMode('list')} 
          style={{ padding: '0.5rem 1.5rem', borderRadius: '30px', fontWeight: 'bold', background: viewMode === 'list' ? 'var(--accent)' : 'var(--glass-bg)', color: viewMode === 'list' ? '#000' : 'var(--text-primary)', border: '1px solid var(--glass-border)', cursor: 'pointer', transition: 'all 0.3s' }}
        >
          List View
        </button>
      </div>

      <div className={viewMode === 'grid' ? "grid" : ""} style={viewMode === 'list' ? { display: 'flex', flexDirection: 'column', gap: '2rem' } : {}}>
        {services.map((service, i) => (
          <article
            key={service.id}
            className="glass-card reveal"
            style={{ 
              transitionDelay: `${(i % 3) * 0.1}s`, 
              display: viewMode === 'list' ? 'flex' : 'block',
              flexDirection: viewMode === 'list' ? 'row' : 'column',
              gap: viewMode === 'list' ? '2rem' : '0',
              alignItems: viewMode === 'list' ? 'center' : 'flex-start'
            }}
          >
            <div className="service-icon" style={viewMode === 'list' ? { marginBottom: 0, flexShrink: 0 } : {}}>{service.icon}</div>
            <div>
              <h3 style={viewMode === 'list' ? { marginBottom: '0.5rem' } : {}}>{service.title}</h3>
              <p style={{ margin: 0 }}>{service.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

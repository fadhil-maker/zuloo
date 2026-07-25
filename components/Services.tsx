'use client';

import { useState } from 'react';
import { Service } from '@/lib/supabase';
import { Monitor, Rocket, Palette, Globe, Smartphone, Code, TrendingUp, Search, PenTool, Layout, Box, Briefcase, Settings, Star } from 'lucide-react';

export default function Services({ services }: { services: Service[] }) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hasToggled, setHasToggled] = useState(false);
  
  if (!services.length) return null;

  const renderIcon = (iconStr: string) => {
    // Map common emojis and keywords to premium Lucide icons
    const str = (iconStr || '').toLowerCase();
    if (str.includes('💻') || str.includes('computer') || str.includes('web')) return <Monitor size={36} strokeWidth={1.5} />;
    if (str.includes('🚀') || str.includes('rocket') || str.includes('launch')) return <Rocket size={36} strokeWidth={1.5} />;
    if (str.includes('🎨') || str.includes('palette') || str.includes('design')) return <Palette size={36} strokeWidth={1.5} />;
    if (str.includes('📱') || str.includes('mobile') || str.includes('phone')) return <Smartphone size={36} strokeWidth={1.5} />;
    if (str.includes('🌐') || str.includes('globe') || str.includes('domain')) return <Globe size={36} strokeWidth={1.5} />;
    if (str.includes('💻') || str.includes('code') || str.includes('dev')) return <Code size={36} strokeWidth={1.5} />;
    if (str.includes('📈') || str.includes('trend') || str.includes('seo')) return <TrendingUp size={36} strokeWidth={1.5} />;
    if (str.includes('🔍') || str.includes('search')) return <Search size={36} strokeWidth={1.5} />;
    if (str.includes('✒️') || str.includes('pen') || str.includes('write')) return <PenTool size={36} strokeWidth={1.5} />;
    if (str.includes('layout')) return <Layout size={36} strokeWidth={1.5} />;
    if (str.includes('box')) return <Box size={36} strokeWidth={1.5} />;
    if (str.includes('briefcase')) return <Briefcase size={36} strokeWidth={1.5} />;
    if (str.includes('settings')) return <Settings size={36} strokeWidth={1.5} />;
    
    // Default fallback
    return <Star size={36} strokeWidth={1.5} />;
  };

  return (
    <section className="services container" id="services">
      <div className="text-center reveal" style={{ marginBottom: '3rem' }}>
        <h5 className="text-accent" style={{ letterSpacing: '2px' }}>WHAT WE DO</h5>
        <h2>Our Services</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          Everything you need to launch and grow your online presence.
        </p>
      </div>

      <div className="view-toggle-container">
        <button 
          onClick={() => { setViewMode('grid'); setHasToggled(true); }} 
          style={{ padding: '0.5rem 1.5rem', borderRadius: '30px', fontWeight: 'bold', background: viewMode === 'grid' ? 'var(--accent)' : 'var(--glass-bg)', color: viewMode === 'grid' ? '#FFF' : 'var(--text-primary)', border: '1px solid var(--glass-border)', cursor: 'pointer', transition: 'all 0.3s' }}
        >
          Grid View
        </button>
        <button 
          onClick={() => { setViewMode('list'); setHasToggled(true); }} 
          style={{ padding: '0.5rem 1.5rem', borderRadius: '30px', fontWeight: 'bold', background: viewMode === 'list' ? 'var(--accent)' : 'var(--glass-bg)', color: viewMode === 'list' ? '#FFF' : 'var(--text-primary)', border: '1px solid var(--glass-border)', cursor: 'pointer', transition: 'all 0.3s' }}
        >
          List View
        </button>
      </div>

      <div className={viewMode === 'grid' ? "grid" : ""} style={viewMode === 'list' ? { display: 'flex', flexDirection: 'column', gap: '2rem' } : {}}>
        {services.map((service, i) => (
          <article
            key={service.id}
            className={`glass-card reveal ${hasToggled ? 'active' : ''}`}
            style={{ 
              transitionDelay: `${(i % 3) * 0.1}s`, 
              display: viewMode === 'list' ? 'flex' : 'block',
              flexDirection: viewMode === 'list' ? 'row' : 'column',
              gap: viewMode === 'list' ? '2rem' : '0',
              alignItems: viewMode === 'list' ? 'center' : 'flex-start'
            }}
          >
            <div className="service-icon" style={viewMode === 'list' ? { marginBottom: 0, flexShrink: 0 } : {}}>
              {renderIcon(service.icon)}
            </div>
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

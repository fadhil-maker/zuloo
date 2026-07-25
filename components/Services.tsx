'use client';

import { useState } from 'react';
import { Service } from '@/lib/supabase';
import { Monitor, Rocket, Palette, Globe, Smartphone, Code, TrendingUp, Search, PenTool, Layout, Box, Briefcase, Settings, Star } from 'lucide-react';

export default function Services({ services }: { services: Service[] }) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hasToggled, setHasToggled] = useState(false);
  
  if (!services.length) return null;

  const renderIcon = (service: Service) => {
    // Map common emojis and keywords from either the icon or the title to premium Lucide icons
    const str = (service.icon + ' ' + service.title).toLowerCase();
    
    if (str.includes('💻') || str.includes('🖥️') || str.includes('computer') || str.includes('web') || str.includes('site')) return <Monitor size={36} strokeWidth={1.5} />;
    if (str.includes('🚀') || str.includes('rocket') || str.includes('launch') || str.includes('fast')) return <Rocket size={36} strokeWidth={1.5} />;
    if (str.includes('🎨') || str.includes('palette') || str.includes('design') || str.includes('ui') || str.includes('ux') || str.includes('brand')) return <Palette size={36} strokeWidth={1.5} />;
    if (str.includes('📱') || str.includes('mobile') || str.includes('phone') || str.includes('app')) return <Smartphone size={36} strokeWidth={1.5} />;
    if (str.includes('🌐') || str.includes('globe') || str.includes('domain') || str.includes('host')) return <Globe size={36} strokeWidth={1.5} />;
    if (str.includes('💻') || str.includes('code') || str.includes('dev') || str.includes('software')) return <Code size={36} strokeWidth={1.5} />;
    if (str.includes('📈') || str.includes('trend') || str.includes('seo') || str.includes('market') || str.includes('grow')) return <TrendingUp size={36} strokeWidth={1.5} />;
    if (str.includes('🔍') || str.includes('search') || str.includes('audit')) return <Search size={36} strokeWidth={1.5} />;
    if (str.includes('✒️') || str.includes('pen') || str.includes('write') || str.includes('copy') || str.includes('content')) return <PenTool size={36} strokeWidth={1.5} />;
    if (str.includes('layout')) return <Layout size={36} strokeWidth={1.5} />;
    if (str.includes('box') || str.includes('package')) return <Box size={36} strokeWidth={1.5} />;
    if (str.includes('briefcase') || str.includes('business')) return <Briefcase size={36} strokeWidth={1.5} />;
    if (str.includes('settings') || str.includes('maintain') || str.includes('support')) return <Settings size={36} strokeWidth={1.5} />;
    
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
              {renderIcon(service)}
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

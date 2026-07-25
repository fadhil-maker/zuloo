'use client';

import { Testimonial } from '@/lib/supabase';
import Image from 'next/image';

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;

  return (
    <section className="testimonials container" id="testimonials">
      <div className="text-center reveal">
        <h5 className="text-accent" style={{ letterSpacing: '2px' }}>REVIEWS</h5>
        <h2>What Clients Say</h2>
      </div>

      <div className="carousel reveal">
        {testimonials.map((t) => (
          <div key={t.id} className="carousel-item glass-card" style={{ padding: '3rem 2rem' }}>
            <div style={{ color: '#FFD700', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ opacity: i < t.rating ? 1 : 0.2 }}>★</span>
              ))}
            </div>
            <blockquote style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '2rem' }}>
              &ldquo;{t.content}&rdquo;
            </blockquote>
            <div className="testimonial-author">
              {t.avatar_url ? (
                <Image src={t.avatar_url} alt={t.client_name} width={50} height={50} className="author-avatar" style={{ objectFit: 'cover' }} />
              ) : (
                <div className="author-avatar" style={{ background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--bg-color)' }}>
                  {t.client_name.charAt(0)}
                </div>
              )}
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)' }}>{t.client_name}</strong>
                {t.client_role && <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t.client_role}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

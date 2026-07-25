'use client';

import { useState, useRef, useEffect } from 'react';
import { Testimonial } from '@/lib/supabase';

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${active * 100}%)`;
    }
  }, [active]);

  // Auto-advance
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && active < testimonials.length - 1) {
        setActive(active + 1);
      } else if (diff < 0 && active > 0) {
        setActive(active - 1);
      }
    }
  };

  if (!testimonials.length) {
    return (
      <section className="testimonials" id="testimonials">
        <div className="section__header reveal">
          <span className="section__label">REVIEWS</span>
          <h2 className="section__title">What Clients Say</h2>
          <p className="section__sub">
            Our first reviews are on the way. Be our next happy client.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="testimonials" id="testimonials">
      <div className="section__header reveal">
        <span className="section__label">REVIEWS</span>
        <h2 className="section__title">What Clients Say</h2>
      </div>

      <div
        className="testimonials__carousel reveal"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="testimonials__track" ref={trackRef}>
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="testimonial-card__stars" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < t.rating ? 'star star--filled' : 'star'}>★</span>
                ))}
              </div>
              <blockquote className="testimonial-card__content">
                &ldquo;{t.content}&rdquo;
              </blockquote>
              <div className="testimonial-card__author">
                {t.avatar_url ? (
                  <img src={t.avatar_url} alt={t.client_name} className="testimonial-card__avatar" width={40} height={40} />
                ) : (
                  <div className="testimonial-card__avatar-placeholder">
                    {t.client_name.charAt(0)}
                  </div>
                )}
                <div>
                  <strong>{t.client_name}</strong>
                  {t.client_role && <span>{t.client_role}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        {testimonials.length > 1 && (
          <div className="testimonials__dots" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonials__dot ${i === active ? 'testimonials__dot--active' : ''}`}
                onClick={() => setActive(i)}
                role="tab"
                aria-selected={i === active}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

'use client';

import { Service } from '@/lib/supabase';

export default function Services({ services }: { services: Service[] }) {
  if (!services.length) return null;

  return (
    <section className="services" id="services">
      <div className="section__header reveal">
        <span className="section__label">WHAT WE DO</span>
        <h2 className="section__title">Our Services</h2>
        <p className="section__sub">
          Everything you need to launch and grow your online presence.
        </p>
      </div>

      <div className="services__grid">
        {services.map((service, i) => (
          <article
            key={service.id}
            className="glass-card reveal"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="glass-card__icon">{service.icon}</div>
            <h3 className="glass-card__title">{service.title}</h3>
            <p className="glass-card__desc">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

'use client';

import { Service } from '@/lib/supabase';

export default function Services({ services }: { services: Service[] }) {
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

      <div className="grid">
        {services.map((service, i) => (
          <article
            key={service.id}
            className="glass-card reveal"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p style={{ margin: 0 }}>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

'use client';

import { ContactInfo } from '@/lib/supabase';

export default function Contact({ contact }: { contact: ContactInfo | null }) {
  const whatsappUrl = contact?.whatsapp
    ? `https://wa.me/${contact.whatsapp}?text=Hi%20ZULOO!%20I'm%20interested%20in%20building%20a%20website.`
    : '#';
  const emailUrl = contact?.email ? `mailto:${contact.email}` : '#';
  const instaUrl = contact?.instagram
    ? `https://instagram.com/${contact.instagram}`
    : '#';
  const phoneUrl = contact?.phone ? `tel:${contact.phone}` : '#';

  return (
    <section className="contact container" id="contact">
      <div className="text-center reveal" style={{ marginBottom: '3rem' }}>
        <h5 className="text-accent" style={{ letterSpacing: '2px' }}>GET IN TOUCH</h5>
        <h2>Let&apos;s Build Together</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          Got an idea? We&apos;d love to hear it. Reach out — we reply fast.
        </p>
      </div>

      <div className="reveal" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', justifyContent: 'center', boxShadow: '0 8px 32px rgba(217,140,69,0.3)' }}>
          <span style={{ fontSize: '1.8rem' }}>💬</span>
          <div style={{ textAlign: 'left' }}>
            <strong style={{ display: 'block', fontSize: '1.2rem' }}>WhatsApp</strong>
            <span style={{ fontSize: '0.9rem', fontWeight: 'normal', opacity: 0.9 }}>Chat with us now</span>
          </div>
        </a>

        <a href={phoneUrl} className="btn btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', justifyContent: 'center' }}>
          <span style={{ fontSize: '1.8rem' }}>📞</span>
          <div style={{ textAlign: 'left' }}>
            <strong style={{ display: 'block', fontSize: '1.2rem' }}>Call Us</strong>
            <span style={{ fontSize: '0.9rem', fontWeight: 'normal', opacity: 0.8 }}>{contact?.phone || '+91 999 505 6728'}</span>
          </div>
        </a>

        <a href={emailUrl} className="btn btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', justifyContent: 'center' }}>
          <span style={{ fontSize: '1.8rem' }}>✉️</span>
          <div style={{ textAlign: 'left' }}>
            <strong style={{ display: 'block', fontSize: '1.2rem' }}>Email</strong>
            <span style={{ fontSize: '0.9rem', fontWeight: 'normal', opacity: 0.8 }}>{contact?.email || 'hello@zuloo.studio'}</span>
          </div>
        </a>

        <a href={instaUrl} target="_blank" rel="noopener noreferrer" className="btn btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', justifyContent: 'center' }}>
          <span style={{ fontSize: '1.8rem' }}>📸</span>
          <div style={{ textAlign: 'left' }}>
            <strong style={{ display: 'block', fontSize: '1.2rem' }}>Instagram</strong>
            <span style={{ fontSize: '0.9rem', fontWeight: 'normal', opacity: 0.8 }}>@{contact?.instagram || 'zuloo.studio'}</span>
          </div>
        </a>
      </div>
    </section>
  );
}

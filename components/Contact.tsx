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

      <div className="grid reveal">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', justifyContent: 'center' }}>
          <span style={{ fontSize: '1.5rem' }}>💬</span>
          <div style={{ textAlign: 'left' }}>
            <strong style={{ display: 'block' }}>WhatsApp</strong>
            <span style={{ fontSize: '0.8rem', fontWeight: 'normal', opacity: 0.8 }}>Chat with us now</span>
          </div>
        </a>

        <a href={phoneUrl} className="btn btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', justifyContent: 'center' }}>
          <span style={{ fontSize: '1.5rem' }}>📞</span>
          <div style={{ textAlign: 'left' }}>
            <strong style={{ display: 'block' }}>Call Us</strong>
            <span style={{ fontSize: '0.8rem', fontWeight: 'normal', opacity: 0.8 }}>{contact?.phone || '+91 999 505 6728'}</span>
          </div>
        </a>

        <a href={emailUrl} className="btn btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', justifyContent: 'center' }}>
          <span style={{ fontSize: '1.5rem' }}>✉️</span>
          <div style={{ textAlign: 'left' }}>
            <strong style={{ display: 'block' }}>Email</strong>
            <span style={{ fontSize: '0.8rem', fontWeight: 'normal', opacity: 0.8 }}>{contact?.email || 'hello@zuloo.studio'}</span>
          </div>
        </a>

        <a href={instaUrl} target="_blank" rel="noopener noreferrer" className="btn btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', justifyContent: 'center' }}>
          <span style={{ fontSize: '1.5rem' }}>📸</span>
          <div style={{ textAlign: 'left' }}>
            <strong style={{ display: 'block' }}>Instagram</strong>
            <span style={{ fontSize: '0.8rem', fontWeight: 'normal', opacity: 0.8 }}>@{contact?.instagram || 'zuloo.studio'}</span>
          </div>
        </a>
      </div>
    </section>
  );
}

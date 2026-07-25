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
      <div className="text-center reveal" style={{ marginBottom: '4rem' }}>
        <span className="text-accent h5-style" style={{ letterSpacing: '2px', display: 'block', textTransform: 'uppercase', marginBottom: '0.5rem', fontSize: '0.83em', fontWeight: 'bold' }}>GET IN TOUCH</span>
        <h2 style={{ fontSize: '3.5rem', fontWeight: 800 }}>Let&apos;s Build Together</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          Got an idea? We&apos;d love to hear it. Reach out — we reply fast.
        </p>
      </div>

      <div className="reveal" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* WhatsApp */}
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-glass diamond-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', textDecoration: 'none' }}>
          <div className="icon-wrapper" style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div style={{ textAlign: 'left', overflow: 'hidden' }}>
            <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--text-primary)' }}>WhatsApp</strong>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', display: 'block' }}>Chat with us now</span>
          </div>
        </a>

        {/* Phone */}
        <a href={phoneUrl} className="btn-glass diamond-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', textDecoration: 'none' }}>
          <div className="icon-wrapper" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))' }}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <div style={{ textAlign: 'left', overflow: 'hidden' }}>
            <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--text-primary)' }}>Call Us</strong>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', display: 'block' }}>{contact?.phone || '+91 999 505 6728'}</span>
          </div>
        </a>

        {/* Email */}
        <a href={emailUrl} className="btn-glass diamond-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', textDecoration: 'none' }}>
          <div className="icon-wrapper" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))' }}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </div>
          <div style={{ textAlign: 'left', overflow: 'hidden' }}>
            <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--text-primary)' }}>Email</strong>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', display: 'block' }}>{contact?.email || 'hello@zuloo.studio'}</span>
          </div>
        </a>

        {/* Instagram */}
        <a href={instaUrl} target="_blank" rel="noopener noreferrer" className="btn-glass diamond-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', textDecoration: 'none' }}>
          <div className="icon-wrapper" style={{ background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #F56040)' }}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
          <div style={{ textAlign: 'left', overflow: 'hidden' }}>
            <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--text-primary)' }}>Instagram</strong>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', display: 'block' }}>@{contact?.instagram || 'zuloo.studio'}</span>
          </div>
        </a>
      </div>
    </section>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Service, Work, Testimonial, ContactInfo } from '@/lib/supabase';
import Logo from '@/components/Logo';

type Tab = 'services' | 'works' | 'testimonials' | 'contact';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('services');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  // Data states
  const [services, setServices] = useState<Service[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contact, setContact] = useState<ContactInfo | null>(null);

  // Form states
  const [serviceForm, setServiceForm] = useState({ title: '', description: '', icon: '🌐', sort_order: 0 });
  const [workForm, setWorkForm] = useState({ title: '', description: '', image_url: '', live_url: '', tags: '' });
  const [testimonialForm, setTestimonialForm] = useState({ client_name: '', client_role: '', content: '', rating: 5 });
  const [contactForm, setContactForm] = useState({ phone: '', email: '', whatsapp: '', instagram: '', tagline: '', show_services: true, show_works: true, show_testimonials: true });

  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        localStorage.setItem('zuloo_admin_token', password);
        setAuthed(true);
      } else {
        setError('Wrong password');
      }
    } catch {
      setError('Connection error');
    }
  };

  // Check saved auth
  useEffect(() => {
    const saved = localStorage.getItem('zuloo_admin_token');
    if (saved) {
      fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: saved }),
      }).then((res) => {
        if (res.ok) setAuthed(true);
        else localStorage.removeItem('zuloo_admin_token');
      });
    }
  }, []);

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    const [s, w, t, c] = await Promise.all([
      supabase.from('services').select('*').order('sort_order'),
      supabase.from('works').select('*').order('created_at', { ascending: false }),
      supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
      supabase.from('contact_info').select('*').single(),
    ]);
    setServices(s.data || []);
    setWorks(w.data || []);
    setTestimonials(t.data || []);
    if (c.data) {
      setContact(c.data);
      setContactForm({
        phone: c.data.phone || '',
        email: c.data.email || '',
        whatsapp: c.data.whatsapp || '',
        instagram: c.data.instagram || '',
        tagline: c.data.tagline || '',
        show_services: c.data.show_services ?? true,
        show_works: c.data.show_works ?? true,
        show_testimonials: c.data.show_testimonials ?? true,
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) fetchData();
  }, [authed, fetchData]);

  // ═══════════ CRUD HANDLERS ═══════════

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingServiceId) {
      const { error } = await supabase.from('services').update(serviceForm).eq('id', editingServiceId);
      if (!error) {
        setServiceForm({ title: '', description: '', icon: '🌐', sort_order: 0 });
        setEditingServiceId(null);
        showToast('Service updated! ✅');
        fetchData();
      }
    } else {
      const { error } = await supabase.from('services').insert([serviceForm]);
      if (!error) {
        setServiceForm({ title: '', description: '', icon: '🌐', sort_order: 0 });
        showToast('Service added! ✅');
        fetchData();
      }
    }
  };

  const handleEditService = (s: any) => {
    setEditingServiceId(s.id);
    setServiceForm({ title: s.title, description: s.description, icon: s.icon, sort_order: s.sort_order });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditService = () => {
    setEditingServiceId(null);
    setServiceForm({ title: '', description: '', icon: '🌐', sort_order: 0 });
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    await supabase.from('services').delete().eq('id', id);
    showToast('Service deleted');
    fetchData();
  };

  const handleAddWork = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = workForm.tags.split(',').map((t) => t.trim()).filter(Boolean);
    const data = { ...workForm, tags };
    
    if (editingWorkId) {
      const { error } = await supabase.from('works').update(data).eq('id', editingWorkId);
      if (!error) {
        setWorkForm({ title: '', description: '', image_url: '', live_url: '', tags: '' });
        setEditingWorkId(null);
        showToast('Work updated! ✅');
        fetchData();
      }
    } else {
      const { error } = await supabase.from('works').insert([data]);
      if (!error) {
        setWorkForm({ title: '', description: '', image_url: '', live_url: '', tags: '' });
        showToast('Work added! ✅');
        fetchData();
      }
    }
  };

  const handleEditWork = (w: any) => {
    setEditingWorkId(w.id);
    setWorkForm({ title: w.title, description: w.description, image_url: w.image_url, live_url: w.live_url || '', tags: Array.isArray(w.tags) ? w.tags.join(', ') : w.tags });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditWork = () => {
    setEditingWorkId(null);
    setWorkForm({ title: '', description: '', image_url: '', live_url: '', tags: '' });
  };

  const handleDeleteWork = async (id: string) => {
    if (!confirm('Delete this work?')) return;
    await supabase.from('works').delete().eq('id', id);
    showToast('Work deleted');
    fetchData();
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestimonialId) {
      const { error } = await supabase.from('testimonials').update(testimonialForm).eq('id', editingTestimonialId);
      if (!error) {
        setTestimonialForm({ client_name: '', client_role: '', content: '', rating: 5 });
        setEditingTestimonialId(null);
        showToast('Testimonial updated! ✅');
        fetchData();
      }
    } else {
      const { error } = await supabase.from('testimonials').insert([testimonialForm]);
      if (!error) {
        setTestimonialForm({ client_name: '', client_role: '', content: '', rating: 5 });
        showToast('Testimonial added! ✅');
        fetchData();
      }
    }
  };

  const handleEditTestimonial = (t: any) => {
    setEditingTestimonialId(t.id);
    setTestimonialForm({ client_name: t.client_name, client_role: t.client_role || '', content: t.content, rating: t.rating });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditTestimonial = () => {
    setEditingTestimonialId(null);
    setTestimonialForm({ client_name: '', client_role: '', content: '', rating: 5 });
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    await supabase.from('testimonials').delete().eq('id', id);
    showToast('Testimonial deleted');
    fetchData();
  };

  const handleToggleActive = async (table: 'services' | 'works' | 'testimonials', id: string, currentStatus: boolean) => {
    const { error } = await supabase.from(table).update({ is_active: !currentStatus }).eq('id', id);
    if (!error) {
      showToast('Visibility updated');
      fetchData();
    } else {
      showToast('Error updating visibility');
    }
  };

  const handleUpdateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contact) {
      await supabase.from('contact_info').update(contactForm).eq('id', contact.id);
      showToast('Contact info updated! ✅');
      fetchData();
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('portfolio').upload(fileName, file);
    if (error) {
      showToast('Upload failed: ' + error.message);
      return '';
    }
    const { data } = supabase.storage.from('portfolio').getPublicUrl(fileName);
    return data.publicUrl;
  };

  // ═══════════ LOGIN SCREEN ═══════════
  if (!authed) {
    return (
      <div className="admin-login">
        <div className="admin-login__card">
          <Logo size={48} />
          <h1>ZULOO Admin</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              autoFocus
            />
            {error && <p className="admin-error">{error}</p>}
            <button type="submit" className="admin-btn admin-btn--primary">Login</button>
          </form>
        </div>
      </div>
    );
  }

  // ═══════════ DASHBOARD ═══════════
  return (
    <div className="admin">
      {/* Toast notification */}
      {toast && <div className="admin-toast">{toast}</div>}

      {/* Header */}
      <header className="admin-header">
        <div className="admin-header__left">
          <Logo size={28} />
          <span>ZULOO Admin</span>
        </div>
        <button
          className="admin-btn admin-btn--ghost"
          onClick={() => {
            localStorage.removeItem('zuloo_admin_token');
            setAuthed(false);
          }}
        >
          Logout
        </button>
      </header>

      {/* Tab navigation */}
      <div className="admin-tabs">
        {(['services', 'works', 'testimonials', 'contact'] as Tab[]).map((tab) => (
          <button
            key={tab}
            className={`admin-tab ${activeTab === tab ? 'admin-tab--active' : ''}`}
            onClick={() => { setActiveTab(tab); }}
          >
            {tab === 'services' && '🔧'}
            {tab === 'works' && '💼'}
            {tab === 'testimonials' && '⭐'}
            {tab === 'contact' && '📞'}
            <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
          </button>
        ))}
      </div>

      {loading && <div className="admin-loading">Loading...</div>}

      <div className="admin-content">
        {/* ═══════════ SERVICES TAB ═══════════ */}
        {activeTab === 'services' && (
          <>
            <form onSubmit={handleAddService} className="admin-form">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>{editingServiceId ? 'Edit Service' : 'Add Service'}</h3>
                {editingServiceId && <button type="button" className="admin-btn admin-btn--ghost" onClick={cancelEditService} style={{ padding: '0.5rem 1rem' }}>Cancel</button>}
              </div>
              <input className="admin-input" placeholder="Icon (emoji)" value={serviceForm.icon} onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })} />
              <input className="admin-input" placeholder="Title" value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} required />
              <textarea className="admin-input" placeholder="Description" value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} required rows={3} />
              <input className="admin-input" type="number" placeholder="Sort order" value={serviceForm.sort_order} onChange={(e) => setServiceForm({ ...serviceForm, sort_order: Number(e.target.value) })} />
              <button type="submit" className="admin-btn admin-btn--primary">{editingServiceId ? 'Update Service' : 'Add Service'}</button>
            </form>

            <div className="admin-list">
              <h3>Current Services ({services.length})</h3>
              {services.map((s) => (
                <div key={s.id} className="admin-item">
                  <div className="admin-item__info">
                    <span className="admin-item__icon">{s.icon}</span>
                    <div>
                      <strong>{s.title}</strong>
                      <p>{s.description}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                      <input type="checkbox" checked={s.is_active ?? true} onChange={() => handleToggleActive('services', s.id, s.is_active ?? true)} />
                      Active
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                      <button className="admin-btn admin-btn--ghost" style={{ padding: '0.5rem 1rem' }} onClick={() => handleEditService(s)}>Edit</button>
                      <button className="admin-btn admin-btn--danger" style={{ padding: '0.5rem 1rem' }} onClick={() => handleDeleteService(s.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ═══════════ WORKS TAB ═══════════ */}
        {activeTab === 'works' && (
          <>
            <form onSubmit={handleAddWork} className="admin-form">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>{editingWorkId ? 'Edit Work' : 'Add Work'}</h3>
                {editingWorkId && <button type="button" className="admin-btn admin-btn--ghost" onClick={cancelEditWork} style={{ padding: '0.5rem 1rem' }}>Cancel</button>}
              </div>
              <input className="admin-input" placeholder="Project title" value={workForm.title} onChange={(e) => setWorkForm({ ...workForm, title: e.target.value })} required />
              <textarea className="admin-input" placeholder="Description" value={workForm.description} onChange={(e) => setWorkForm({ ...workForm, description: e.target.value })} required rows={3} />
              <input 
                className="admin-input" 
                placeholder="Live URL (https://...)" 
                value={workForm.live_url} 
                onChange={(e) => setWorkForm({ ...workForm, live_url: e.target.value })}
                onBlur={() => {
                  if (workForm.live_url && !workForm.image_url) {
                    setWorkForm({ ...workForm, image_url: `https://image.thum.io/get/width/1200/crop/800/${workForm.live_url}` });
                    showToast('Preview auto-fetched! 📸');
                  }
                }}
              />
              <input className="admin-input" placeholder="Tags (comma-separated)" value={workForm.tags} onChange={(e) => setWorkForm({ ...workForm, tags: e.target.value })} />
              <div className="admin-upload">
                <label className="admin-btn admin-btn--glass">
                  📸 Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        showToast('Uploading...');
                        const url = await handleImageUpload(file);
                        if (url) {
                          setWorkForm({ ...workForm, image_url: url });
                          showToast('Image uploaded! ✅');
                        }
                      }
                    }}
                  />
                </label>
                {workForm.image_url && (
                  <div style={{ marginTop: '1rem', width: '100%', maxWidth: '300px', borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <img src={workForm.image_url} alt="Preview" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    <button 
                      type="button" 
                      onClick={() => setWorkForm({ ...workForm, image_url: '' })}
                      style={{ width: '100%', padding: '0.5rem', background: 'rgba(255,0,0,0.2)', color: 'red', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Remove Image
                    </button>
                  </div>
                )}
              </div>
              <button type="submit" className="admin-btn admin-btn--primary">{editingWorkId ? 'Update Work' : 'Add Work'}</button>
            </form>

            <div className="admin-list">
              <h3>Portfolio ({works.length})</h3>
              {works.map((w) => (
                <div key={w.id} className="admin-item">
                  <div className="admin-item__info">
                    {w.image_url && <img src={w.image_url} alt={w.title} className="admin-item__thumb" />}
                    <div>
                      <strong>{w.title}</strong>
                      <p>{w.description}</p>
                      {w.live_url && <a href={w.live_url} target="_blank" rel="noopener noreferrer" className="admin-item__link">↗ {w.live_url}</a>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                      <input type="checkbox" checked={w.is_active ?? true} onChange={() => handleToggleActive('works', w.id, w.is_active ?? true)} />
                      Active
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                      <button className="admin-btn admin-btn--ghost" style={{ padding: '0.5rem 1rem' }} onClick={() => handleEditWork(w)}>Edit</button>
                      <button className="admin-btn admin-btn--danger" style={{ padding: '0.5rem 1rem' }} onClick={() => handleDeleteWork(w.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ═══════════ TESTIMONIALS TAB ═══════════ */}
        {activeTab === 'testimonials' && (
          <>
            <form onSubmit={handleAddTestimonial} className="admin-form">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>{editingTestimonialId ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
                {editingTestimonialId && <button type="button" className="admin-btn admin-btn--ghost" onClick={cancelEditTestimonial} style={{ padding: '0.5rem 1rem' }}>Cancel</button>}
              </div>
              <input className="admin-input" placeholder="Client name" value={testimonialForm.client_name} onChange={(e) => setTestimonialForm({ ...testimonialForm, client_name: e.target.value })} required />
              <input className="admin-input" placeholder="Client role (e.g. CEO, Founder)" value={testimonialForm.client_role} onChange={(e) => setTestimonialForm({ ...testimonialForm, client_role: e.target.value })} />
              <textarea className="admin-input" placeholder="What did the client say?" value={testimonialForm.content} onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })} required rows={4} />
              <div className="admin-rating">
                <label>Rating:</label>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" className={`admin-star ${n <= testimonialForm.rating ? 'admin-star--active' : ''}`} onClick={() => setTestimonialForm({ ...testimonialForm, rating: n })}>
                    ★
                  </button>
                ))}
              </div>
              <button type="submit" className="admin-btn admin-btn--primary">{editingTestimonialId ? 'Update Testimonial' : 'Add Testimonial'}</button>
            </form>

            <div className="admin-list">
              <h3>Reviews ({testimonials.length})</h3>
              {testimonials.map((t) => (
                <div key={t.id} className="admin-item">
                  <div className="admin-item__info">
                    <div>
                      <strong>{t.client_name}</strong>
                      {t.client_role && <span className="admin-item__role"> — {t.client_role}</span>}
                      <p>&ldquo;{t.content}&rdquo;</p>
                      <div className="admin-item__stars">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                      <input type="checkbox" checked={t.is_active ?? true} onChange={() => handleToggleActive('testimonials', t.id, t.is_active ?? true)} />
                      Active
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                      <button className="admin-btn admin-btn--ghost" style={{ padding: '0.5rem 1rem' }} onClick={() => handleEditTestimonial(t)}>Edit</button>
                      <button className="admin-btn admin-btn--danger" style={{ padding: '0.5rem 1rem' }} onClick={() => handleDeleteTestimonial(t.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ═══════════ CONTACT TAB ═══════════ */}
        {activeTab === 'contact' && (
          <form onSubmit={handleUpdateContact} className="admin-form">
            <h3>Contact Information</h3>
            <label className="admin-label">Phone Number</label>
            <input className="admin-input" placeholder="+91 999 505 6728" value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} />
            <label className="admin-label">Email</label>
            <input className="admin-input" type="email" placeholder="hello@zuloo.studio" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} />
            <label className="admin-label">WhatsApp Number (no +, just digits)</label>
            <input className="admin-input" placeholder="919995056728" value={contactForm.whatsapp} onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })} />
            <label className="admin-label">Instagram Handle (without @)</label>
            <input className="admin-input" placeholder="zuloo.studio" value={contactForm.instagram} onChange={(e) => setContactForm({ ...contactForm, instagram: e.target.value })} />
            <label className="admin-label">Hero Tagline</label>
            <textarea className="admin-input" placeholder="Custom-crafted, mobile-first websites..." value={contactForm.tagline} onChange={(e) => setContactForm({ ...contactForm, tagline: e.target.value })} rows={2} />
            
            <h3 style={{ marginTop: '2rem' }}>Section Visibility</h3>
            <p className="admin-label" style={{ marginBottom: '1rem' }}>Toggle sections on or off the live website.</p>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={contactForm.show_services} onChange={(e) => setContactForm({ ...contactForm, show_services: e.target.checked })} style={{ width: '20px', height: '20px' }} />
              <span>Show Services Section</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={contactForm.show_works} onChange={(e) => setContactForm({ ...contactForm, show_works: e.target.checked })} style={{ width: '20px', height: '20px' }} />
              <span>Show Portfolio Section</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={contactForm.show_testimonials} onChange={(e) => setContactForm({ ...contactForm, show_testimonials: e.target.checked })} style={{ width: '20px', height: '20px' }} />
              <span>Show Testimonials Section</span>
            </label>

            <button type="submit" className="admin-btn admin-btn--primary" style={{ marginTop: '1.5rem' }}>Update Settings</button>
          </form>
        )}
      </div>
    </div>
  );
}

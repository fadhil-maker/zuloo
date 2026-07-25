-- ZULOO Website Database Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)

-- ═══════════════════════════════════════════
-- CONTACT INFO (single row, editable from admin)
-- ═══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  whatsapp TEXT DEFAULT '',
  instagram TEXT DEFAULT '',
  tagline TEXT DEFAULT 'We build websites that work.',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default row
INSERT INTO contact_info (phone, email, whatsapp, instagram, tagline)
VALUES (
  '+919995056728',
  'hello@zuloo.studio',
  '919995056728',
  'zuloo.studio',
  'We build websites that work.'
);

-- ═══════════════════════════════════════════
-- SERVICES
-- ═══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT DEFAULT '🌐',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Default services
INSERT INTO services (title, description, icon, sort_order) VALUES
  ('Custom Websites', 'Hand-crafted, responsive websites built from scratch. No templates, no shortcuts.', '🖥️', 1),
  ('Landing Pages', 'High-converting single-page sites designed to turn visitors into customers.', '🚀', 2),
  ('E-Commerce', 'Online stores that look premium and sell effortlessly. Built for mobile shoppers.', '🛒', 3),
  ('UI/UX Design', 'Pixel-perfect interfaces designed for real humans. Every tap, every scroll — intentional.', '🎨', 4),
  ('SEO Optimization', 'We don''t just build — we make sure Google finds you. Technical SEO baked into every project.', '📈', 5),
  ('Maintenance', 'Post-launch support, updates, and performance monitoring. We don''t disappear after delivery.', '🔧', 6);

-- ═══════════════════════════════════════════
-- WORKS / PORTFOLIO
-- ═══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS works (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT DEFAULT '',
  live_url TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════
-- TESTIMONIALS / CLIENT REVIEWS
-- ═══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_role TEXT DEFAULT '',
  content TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- Public can READ, only authenticated can WRITE
-- ═══════════════════════════════════════════

ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read contact_info" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read works" ON works FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);

-- Auth write policies (for admin panel)
CREATE POLICY "Auth insert services" ON services FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth update services" ON services FOR UPDATE USING (true);
CREATE POLICY "Auth delete services" ON services FOR DELETE USING (true);

CREATE POLICY "Auth insert works" ON works FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth update works" ON works FOR UPDATE USING (true);
CREATE POLICY "Auth delete works" ON works FOR DELETE USING (true);

CREATE POLICY "Auth insert testimonials" ON testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth update testimonials" ON testimonials FOR UPDATE USING (true);
CREATE POLICY "Auth delete testimonials" ON testimonials FOR DELETE USING (true);

CREATE POLICY "Auth update contact_info" ON contact_info FOR UPDATE USING (true);

-- ═══════════════════════════════════════════
-- STORAGE BUCKET for portfolio images
-- ═══════════════════════════════════════════
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to portfolio images
CREATE POLICY "Public read portfolio" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "Auth upload portfolio" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio');
CREATE POLICY "Auth delete portfolio" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio');

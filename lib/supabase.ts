import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ═══════════════════════════════════════════
   TYPE DEFINITIONS
═══════════════════════════════════════════ */

export interface ContactInfo {
  id: string;
  phone: string;
  email: string;
  whatsapp: string;
  instagram: string;
  tagline: string;
  show_services: boolean;
  show_works: boolean;
  show_testimonials: boolean;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  created_at: string;
}

export interface Work {
  id: string;
  title: string;
  description: string;
  image_url: string;
  live_url: string;
  tags: string[];
  featured: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_role: string;
  content: string;
  rating: number;
  avatar_url: string;
  created_at: string;
}

/* ═══════════════════════════════════════════
   DATA FETCHERS (used in Server Components)
═══════════════════════════════════════════ */

export async function getContactInfo(): Promise<ContactInfo | null> {
  const { data } = await supabase
    .from('contact_info')
    .select('*')
    .single();
  return data;
}

export async function getServices(): Promise<Service[]> {
  const { data } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true });
  return data || [];
}

export async function getWorks(): Promise<Work[]> {
  const { data } = await supabase
    .from('works')
    .select('*')
    .order('created_at', { ascending: false });
  return data || [];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });
  return data || [];
}

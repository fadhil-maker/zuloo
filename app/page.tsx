import { getContactInfo, getServices, getWorks, getTestimonials } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Works from '@/components/Works';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

// Revalidate every 60 seconds so admin changes appear quickly
export const revalidate = 60;

export default async function Home() {
  const [contact, services, works, testimonials] = await Promise.all([
    getContactInfo(),
    getServices(),
    getWorks(),
    getTestimonials(),
  ]);

  const activeServices = services.filter(s => s.is_active !== false);
  const activeWorks = works.filter(w => w.is_active !== false);
  const activeTestimonials = testimonials.filter(t => t.is_active !== false);

  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        <Hero tagline={contact?.tagline} />
        {contact?.show_services !== false && <Services services={activeServices} />}
        {contact?.show_works !== false && <Works works={activeWorks} />}
        {contact?.show_testimonials !== false && <Testimonials testimonials={activeTestimonials} />}
        <Contact contact={contact} />
      </main>
      <Footer />
    </>
  );
}

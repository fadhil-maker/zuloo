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

  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        <Hero tagline={contact?.tagline} />
        <Services services={services} />
        <Works works={works} />
        <Testimonials testimonials={testimonials} />
        <Contact contact={contact} />
      </main>
      <Footer />
    </>
  );
}

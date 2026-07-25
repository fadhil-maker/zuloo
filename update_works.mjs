import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function update() {
  const { data: works, error } = await supabase.from('works').select('*');
  if (error) {
    console.error("Error fetching:", error);
    return;
  }
  
  for (const work of works) {
    if (work.live_url && !work.image_url) {
      const imgUrl = `https://image.thum.io/get/width/1200/crop/800/${work.live_url}`;
      let description = work.description;
      
      // Expand description to a short abstract if it's too short
      if (description.length < 100) {
        if (work.title.includes("Muhammed Fadhil")) {
          description = `A comprehensive personal portfolio and professional branding platform. It showcases a curated selection of recent projects, detailed work experience, and technical skills, providing a complete overview of professional capabilities and creative vision.`;
        } else if (work.title.includes("Shanu Digicore")) {
          description = `A modern corporate web presence designed to establish authority and trust. Features a responsive layout, detailed service breakdowns, and optimized performance to drive business growth and client engagement.`;
        } else if (work.title === "Zuloo") {
          description = `The official website for Zuloo Studio, a creative web development agency. Built with a mobile-first approach, it features premium glassmorphism aesthetics, dynamic scroll animations, and a focus on high-converting user experiences.`;
        } else if (work.title === "Fin Edge") {
          description = `A cutting-edge financial dashboard application. Features data visualization, real-time tracking interfaces, and a clean, accessible UI designed for complex data management and user productivity.`;
        }
      }

      await supabase.from('works').update({ image_url: imgUrl, description }).eq('id', work.id);
      console.log(`Updated ${work.title}`);
    }
  }
  console.log("Done updating works!");
}

update();

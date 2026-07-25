import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const works = [
  {
    title: "Muhammed Fadhil",
    description: "Personal portfolio and professional branding website showcasing skills, projects, and experience.",
    live_url: "https://muhammedfadhil.vercel.app",
    tags: ["Portfolio", "Web Development"],
  },
  {
    title: "Muhammed Fadhil V1",
    description: "Previous iteration of the personal portfolio website.",
    live_url: "https://muhammedfadhil1.vercel.app",
    tags: ["Portfolio", "Archive"],
  },
  {
    title: "Shanu Digicore",
    description: "Corporate website for Shanu Digicore, establishing a strong digital presence.",
    live_url: "https://shanudigicore.com",
    tags: ["Corporate", "Business"],
  },
  {
    title: "Pharma - Shanu Digicore",
    description: "Pharmaceutical branch website for Shanu Digicore, designed for industry professionals.",
    live_url: "https://pharma.shanudigicore.com",
    tags: ["Pharma", "Business"],
  },
  {
    title: "Zuloo",
    description: "Creative agency and web development studio providing premium digital services.",
    live_url: "https://zuloo.vercel.app",
    tags: ["Agency", "Services"],
  },
  {
    title: "Fin Edge",
    description: "Modern financial edge platform and dashboard interface.",
    live_url: "https://fin-edge-ten.vercel.app/devweb/index.html",
    tags: ["Finance", "Web App"],
  }
];

async function insert() {
  const { data, error } = await supabase.from('works').insert(works);
  if (error) {
    console.error("Error inserting:", error);
  } else {
    console.log("Success inserting works!");
  }
}
insert();

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { fetchContent } from "../lib/api";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchContent("profile").then(setProfile);
  }, []);

  if (!profile) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-32 relative">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs uppercase tracking-[0.4em] mb-8 block opacity-50">
              {profile.role}
            </span>
            <h1 className="text-[12vw] md:text-[10vw] font-bold leading-[0.85] tracking-tighter uppercase mb-12">
              {profile.headline?.first || "Distributed"} <br />
              {profile.headline?.second || "Systems."} <br />
              <span className="text-[#F27D26]">{profile.headline?.accent || "Engineered for Scale."}</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl opacity-60 leading-relaxed">
              {profile.bio}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="absolute top-0 right-0 w-1/3 aspect-square hidden lg:block overflow-hidden rounded-full border border-white/10"
          >
            <img 
              src={profile.avatar} 
              alt={profile.name}
              className="w-full h-full object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </section>

        {/* Featured Projects */}
        <section className="mb-32">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl uppercase tracking-tighter font-bold mb-4">Featured Work</h2>
              <div className="h-1 w-12 bg-[#F27D26]" />
            </div>
            <Link to="/projects" className="text-xs uppercase tracking-[0.2em] opacity-50 hover:opacity-100 flex items-center gap-2 mb-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {profile.projects.slice(0, 2).map((project: any, index: number) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-y border-white/5 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8">
            Open for technical <br /> discussions and collaboration.
          </h2>
          <a
            href={`mailto:${profile.socials.email || 'arnab.ghose128@gmail.com'}`}
            className="group relative inline-flex items-center gap-4 px-12 py-6 border border-white/20 rounded-full text-xl uppercase tracking-widest overflow-hidden transition-colors hover:bg-white hover:text-[#050505]"
          >
            Get in touch
            <ArrowRight className="transition-transform group-hover:translate-x-2" />
          </a>
        </section>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="group"
    >
      <Link to={`/projects`} className="block overflow-hidden bg-white/5 aspect-video mb-6 relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop";
            target.onerror = null;
          }}
        />
        <div className="absolute inset-0 bg-[#050505]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <span className="px-6 py-3 border border-white rounded-full uppercase tracking-widest text-xs">View Project</span>
        </div>
      </Link>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold uppercase tracking-tighter mb-2">{project.title}</h3>
          <div className="flex gap-3">
            {project.tags.map((tag: string) => (
              <span key={tag} className="text-[10px] uppercase tracking-widest opacity-40">
                # {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

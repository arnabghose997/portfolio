import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { fetchContent } from "../lib/api";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContent("profile")
      .then(setProfile)
      .catch(err => {
        console.error(err);
        setError("Failed to load portfolio data.");
      });
  }, []);

  if (error) return <div className="pt-40 text-center text-red-500">{error}</div>;
  if (!profile) return <div className="pt-40 text-center uppercase tracking-widest opacity-50">Compiling Portfolio...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-24">
          <h1 className="text-[12vw] font-bold leading-none tracking-tighter uppercase">
            Curated <br />
            Portfolio.
          </h1>
          <p className="mt-8 max-w-xl text-xl opacity-60">
            A selection of projects that define my approach to digital design and engineering.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-32">
          {profile.projects.map((project: any, index: number) => (
            <div
              key={project.id}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-24 group`}
            >
              <div className="flex-1 overflow-hidden aspect-video relative rounded-lg bg-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop";
                    target.onerror = null;
                  }}
                />
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <span className="text-xs uppercase tracking-[0.4em] opacity-30 mb-4">
                  Case Study 0{index + 1}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">
                  {project.title}
                </h2>
                <p className="text-xl opacity-60 leading-relaxed mb-8">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-white/5 rounded-full text-[10px] uppercase tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] font-medium border-b border-white/20 w-fit pb-2 group-hover:border-[#F27D26] group-hover:text-[#F27D26] transition-all"
                >
                  View Case Study <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { fetchContent } from "../lib/api";

export default function About() {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContent("profile")
      .then(setProfile)
      .catch(err => {
        console.error(err);
        setError("Failed to load profile data.");
      });
  }, []);

  if (error) return <div className="pt-40 text-center text-red-500">{error}</div>;
  if (!profile) return <div className="pt-40 text-center uppercase tracking-widest opacity-50">Architecting Content...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-24">
          <h1 className="text-[12vw] font-bold leading-none tracking-tighter uppercase mb-12">
            The <br />
            Architect.
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <div className="prose prose-invert prose-lg">
              {profile.about.story.split("\n\n").map((para: string, i: number) => (
                <p key={i} className="opacity-70 leading-relaxed text-xl">
                  {para}
                </p>
              ))}
            </div>

            <div className="pt-12 border-t border-white/10">
              <h3 className="text-sm uppercase tracking-[0.4em] opacity-40 mb-8">Technical Proficiency</h3>
              <div className="flex flex-wrap gap-4">
                {profile.about.skills.map((skill: string) => (
                  <div
                    key={skill}
                    className="px-6 py-3 border border-white/10 rounded-full text-xs uppercase tracking-widest hover:border-[#F27D26] hover:text-[#F27D26] transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky top-32">
              <div className="aspect-[4/5] bg-white/5 rounded-2xl overflow-hidden relative">
                 <img 
                  src={profile.avatar} 
                  alt={profile.name}
                  className="w-full h-full object-cover grayscale brightness-75 transition-all duration-700 hover:grayscale-0 hover:brightness-100"
                  referrerPolicy="no-referrer"
                />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8">
                <div className="text-2xl font-bold uppercase tracking-tighter">{profile.name}</div>
                <div className="text-xs uppercase tracking-[0.3em] opacity-50 mt-1">{profile.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

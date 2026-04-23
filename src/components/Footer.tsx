import { Github, Twitter, Linkedin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold tracking-tighter uppercase">Arnab Ghose</div>
          <div className="text-xs uppercase tracking-widest opacity-40">
            © {new Date().getFullYear()} Arnab Ghose. All rights reserved.
          </div>
        </div>

        <div className="flex gap-8">
          <a href="#" className="opacity-40 hover:opacity-100 transition-opacity">
            <Github size={20} />
          </a>
          <a href="#" className="opacity-40 hover:opacity-100 transition-opacity">
            <Twitter size={20} />
          </a>
          <a href="#" className="opacity-40 hover:opacity-100 transition-opacity">
            <Linkedin size={20} />
          </a>
        </div>

        <div className="text-[10px] uppercase tracking-[0.2em] opacity-40 flex items-center gap-2">
          Built with <Heart size={10} className="text-[#F27D26]" /> and intentionality.
        </div>
      </div>
    </footer>
  );
}

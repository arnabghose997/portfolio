import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { fetchBlogs } from "../lib/api";
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";

export default function Blog() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetchBlogs().then(setBlogs);
  }, []);

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
            Deep <br />
            Thoughts.
          </h1>
          <p className="mt-8 max-w-xl text-xl opacity-60">
            Notes and insights on the intersection of design, technology, and engineering.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.id}`} className="group flex flex-col h-full border border-white/10 hover:border-[#F27D26]/30 transition-colors bg-white/2 overflow-hidden rounded-xl">
              <div className="aspect-video overflow-hidden">
                <img
                  src={blog.cover}
                  alt={blog.title}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex gap-4 items-center mb-6 opacity-40 text-[10px] uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date}</span>
                  <span className="flex items-center gap-1"><User size={12} /> {blog.author}</span>
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4 group-hover:text-[#F27D26] transition-colors">{blog.title}</h3>
                <p className="text-base opacity-60 leading-relaxed line-clamp-3 mb-8">
                  {blog.excerpt}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {blog.tags?.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[9px] uppercase tracking-widest opacity-40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

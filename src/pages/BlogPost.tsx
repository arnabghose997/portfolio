import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBlogById } from "../lib/api";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";

export default function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchBlogById(id).then(setBlog);
    }
  }, [id]);

  if (!blog) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-24 px-6 md:px-12"
    >
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest opacity-50 hover:opacity-100 mb-12 transition-opacity">
          <ArrowLeft size={14} /> Back to Blog
        </Link>
        
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8 leading-tight">
            {blog.title}
          </h1>
          <div className="flex flex-wrap gap-8 items-center border-y border-white/10 py-6">
             <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-50">
              <Calendar size={14} /> {blog.date}
            </div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-50">
              <User size={14} /> {blog.author}
            </div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-50">
              <Clock size={14} /> 5 min read
            </div>
          </div>
        </header>

        <div className="aspect-video mb-16 rounded-2xl overflow-hidden bg-white/5">
           <img
            src={blog.cover}
            alt={blog.title}
            className="w-full h-full object-cover grayscale brightness-75 transition-all duration-1000 hover:grayscale-0 hover:brightness-100"
            referrerPolicy="no-referrer"
          />
        </div>

        <article className="markdown-content">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </article>

        <footer className="mt-24 pt-12 border-t border-white/10">
           <div className="flex flex-wrap gap-3">
              {blog.tags?.map((tag: string) => (
                <span key={tag} className="px-6 py-2 border border-white/10 rounded-full text-xs uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
        </footer>
      </div>
    </motion.div>
  );
}

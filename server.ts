import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  
  // Get About/Portfolio data
  app.get("/api/content/:filename", async (req, res) => {
    console.log(`[API] Fetching content: ${req.params.filename}`);
    try {
      const { filename } = req.params;
      const filePath = path.join(__dirname, "content", `${filename}.json`);
      const content = await fs.readFile(filePath, "utf-8");
      res.json(JSON.parse(content));
    } catch (error) {
      res.status(404).json({ error: "Content not found" });
    }
  });

  // List all blogs
  app.get("/api/blogs", async (req, res) => {
    try {
      const blogDir = path.join(__dirname, "content", "blog");
      const files = await fs.readdir(blogDir);
      const blogs = await Promise.all(
        files
          .filter((file) => file.endsWith(".md"))
          .map(async (file) => {
            const filePath = path.join(blogDir, file);
            const source = await fs.readFile(filePath, "utf-8");
            const { data } = matter(source);
            return {
              id: file.replace(".md", ""),
              ...data,
            };
          })
      );
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Failed to list blogs" });
    }
  });

  // Get specific blog post
  app.get("/api/blogs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const filePath = path.join(__dirname, "content", "blog", `${id}.md`);
      const source = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(source);
      res.json({ id, ...data, content });
    } catch (error) {
      res.status(404).json({ error: "Blog not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

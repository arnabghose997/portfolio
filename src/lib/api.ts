export async function fetchContent(filename: string) {
  const response = await fetch(`/api/content/${filename}`);
  if (!response.ok) throw new Error("Failed to fetch content");
  return response.json();
}

export async function fetchBlogs() {
  const response = await fetch("/api/blogs");
  if (!response.ok) throw new Error("Failed to fetch blogs");
  return response.json();
}

export async function fetchBlogById(id: string) {
  const response = await fetch(`/api/blogs/${id}`);
  if (!response.ok) throw new Error("Failed to fetch blog post");
  return response.json();
}

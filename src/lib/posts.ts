export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const API_BASE = "https://jsonplaceholder.typicode.com";

export async function getPosts(limit = 10): Promise<Post[]> {
  const res = await fetch(`${API_BASE}/posts`);

  if (!res.ok) {
    throw new Error("failed to load posts");
  }

  const posts: Post[] = await res.json();
  return posts.slice(0, limit);
}

export async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(`${API_BASE}/posts/${id}`);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("failed to load post");
  }

  return res.json();
}

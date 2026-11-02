import { apiClient } from '../client';

// Example service against the default demo API (jsonplaceholder).
// Replace with your real endpoints, e.g. src/api/services/movies.ts.
export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export async function getPost(id: number): Promise<Post> {
  const { data } = await apiClient.get<Post>(`/posts/${id}`);
  return data;
}

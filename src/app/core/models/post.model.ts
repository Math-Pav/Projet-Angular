export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  authorName?: string;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

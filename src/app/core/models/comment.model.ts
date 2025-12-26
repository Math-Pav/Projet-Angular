export interface Comment {
  id: number;
  postId: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    image?: string;
  };
  body: string;
}

export interface CommentsResponse {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}

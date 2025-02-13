export interface Post {
  _id: string;
  user_id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  likes: number;
  comments_count: number;
}
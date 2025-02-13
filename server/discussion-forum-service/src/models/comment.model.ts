export interface Comment {
  _id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  likes: number;
}
import { v4 as uuidv4 } from "uuid";

export const posts = [
  {
    _id: "1",
    user_id: uuidv4(),
    title: "How can someone invest in private equity?",
    content: "Is there a way to invest a small amount (say $100) in unlisted companies?",
    tags: ["investing", "equity"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    likes: 10,
    comments_count: 2,
  },
];

export const comments = [
  {
    _id: "101",
    post_id: "1",
    user_id: uuidv4(),
    content: "Check out the NextUnicorn. They are great!",
    created_at: new Date().toISOString(),
    likes: 5,
  },
];

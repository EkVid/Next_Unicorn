import { v4 as uuidv4 } from "uuid";

export const mockPosts = [
  {
    // _id: "1",
    user_id: uuidv4(),
    title: "How can someone invest in private equity?",
    content: "Is there a way to invest a small amount (say $100) in unlisted companies?",
    tags: ["investing", "equity"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    likes: 0,
    comments_count: 0,
  },
];

export const mockComments = [
  {
    //  _id: "101",
    post_id: uuidv4(),
    user_id: uuidv4(),
    content: "Check out the NextUnicorn. They are great!",
    created_at: new Date().toISOString(),
    likes: 0,
  },
];

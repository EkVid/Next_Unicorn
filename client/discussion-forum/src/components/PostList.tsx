import PostCard from "./PostCard";

//TODO : To move to mock.ts and replace with API call 
const dummyPosts = [
  {
    title: "Blockchain developer best practices on innovationchain",
    author: "Pavel Gvay",
    tags: ["finance", "bitcoin", "crypto"],
    views: 324,
    likes: 45,
    comments: 5,
    timeAgo: "3 weeks ago",
  },
  {
    title: "The 4-step SEO framework that led to a 1000% increase in traffic.",
    author: "John Doe",
    tags: ["seo", "blogging", "traffic"],
    views: 564,
    likes: 25,
    comments: 14,
    timeAgo: "3 days ago",
  },
];

const PostList = () => {
  return (
    <div className="mt-4 md:mt-6 max-w-full md:max-w-3xl mx-auto space-y-3 md:space-y-4 md:px-0">
      {dummyPosts.map((post, index) => (
        <PostCard key={index} {...post} />
      ))}
    </div>
  );
};

export default PostList;
import Header from "../components/Header";
import CreatePostPrompt from "../components/CreatePostPrompt";
import PostList from "../components/PostList";

export default function Dashboard() {
  return (
    <div className="bg-white min-h-screen text-white">
      <Header />
      <main className="pt-16 md:pt-20 px-2 md:px-16">
        <CreatePostPrompt />
        <PostList />
      </main>
    </div>
  );
}
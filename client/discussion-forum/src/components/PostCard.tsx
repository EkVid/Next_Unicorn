import { FaHeart, FaComment } from "react-icons/fa";

interface PostProps {
  title: string;
  author: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  timeAgo: string;
}

const PostCard: React.FC<PostProps> = ({
  title,
  author,
  tags,
  views,
  likes,
  comments,
  timeAgo,
}) => {
  return (
    <div className="bg-gray-900 text-white p-3 md:p-4 rounded-lg shadow-md">
      <h3 className="text-sm md:text-lg font-semibold">{title}</h3>
      <p className="text-gray-400 text-xs md:text-sm">{tags.join(" • ")}</p>
      <div className="flex justify-between items-center mt-2">
        <p className="text-gray-400 text-xs">{author} • {timeAgo}</p>
        <div className="flex gap-1 md:gap-2 text-gray-400 text-xs md:text-sm">
          <span>{views} Views</span>
          <span className="flex items-center gap-1"><FaHeart /> {likes}</span>
          <span className="flex items-center gap-1"><FaComment /> {comments}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
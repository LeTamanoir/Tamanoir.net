import { Link } from "react-router-dom";
import useMemoFetcher from "../hooks/useMemoFetcher.jsx";

interface Posts {
  date: string;
  description: string;
  href: string;
  title: string;
}

export default function Posts() {
  const { data: posts } = useMemoFetcher<Posts[]>("/api/blog");

  if (!posts) return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <Link
          key={post.href}
          to={`/blog/${post.href}`}
          className="border-black dark:border-white border mb-8 p-4 link-blog"
        >
          <h2 className="text-lg mb-2">{post.title}</h2>
          <p className="text-base font-light break-words">{post.description}</p>
        </Link>
      ))}
    </div>
  );
}

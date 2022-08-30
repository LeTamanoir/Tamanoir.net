import { Link } from "react-router-dom";

export default function Posts({ posts }) {
  return posts.length === 0 ? (
    <div className="text-white">Loading...</div>
  ) : (
    <div className="flex flex-col">
      {posts.map((post) => (
        <Link
          key={post.href}
          to={`/blog?post=${post.href}`}
          className="border-white border mb-8 p-4 text-white link-blog"
        >
          <h2 className="text-lg mb-2">{post.title}</h2>
          <p className="text-base font-light">{post.description}</p>
        </Link>
      ))}
    </div>
  );
}

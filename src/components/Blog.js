import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Post from "./Post";
import Posts from "./Posts";

export default function Blog() {
  const [showPosts, setShowPosts] = useState(false);

  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);

  let [searchParams, _] = useSearchParams();

  const fetchPosts = async () => {
    const res = await fetch("/api/blog");
    const data = await res.json();
    setPosts(data);
  };

  const fetchPost = async (href) => {
    const res = await fetch(`/api/blog/${href}`);
    const data = await res.json();
    setPost(data);
  };

  useEffect(() => {
    const href = searchParams.get("post");

    // index so load all posts
    if (!href) return setShowPosts(true);

    setShowPosts(false);
    fetchPost(href);
  }, [searchParams]);

  // load all posts if at the index
  useEffect(() => {
    if (!showPosts) return;

    fetchPosts();
  }, [showPosts]);

  return (
    <main className="flex w-[90vw] sm:w-[50rem] justify-center my-14">
      {showPosts ? <Posts posts={posts} /> : <Post post={post} />}
    </main>
  );
}

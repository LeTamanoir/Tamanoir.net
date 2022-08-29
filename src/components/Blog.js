import { useEffect, useState } from "react";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setPosts(data);

      console.log(data);
    };

    fetchPosts();

    console.log("loading posts");
  }, []);

  return (
    <main className="flex w-[50rem] items-center mt-40">
      <p className="text-base text-white mx-auto">coming soon</p>
    </main>
  );
}

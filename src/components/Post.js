import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const [post, setPost] = useState({});

  const { postName } = useParams();

  const fetchPost = async (href) => {
    const res = await fetch(`/api/blog/${href}`);
    const data = await res.json();
    setPost(data);
  };

  useEffect(() => {
    if (post.content) return;

    console.log(postName, post);
    fetchPost(postName);
  }, [postName]);

  return post.content === "" ? (
    <div>Loading...</div>
  ) : (
    <div
      className="markdown w-full"
      dangerouslySetInnerHTML={{ __html: post.content }}
    ></div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Post() {
  const [post, setPost] = useState({});

  const { postName } = useParams();
  const navigate = useNavigate();

  const fetchPost = async (href) => {
    try {
      const res = await fetch(`/api/blog/${href}`);
      const data = await res.json();
      setPost(data);
    } catch (e) {
      navigate("/404");
    }
  };

  useEffect(() => {
    if (post.content) return;

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

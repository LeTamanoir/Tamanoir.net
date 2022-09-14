import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetcher from "../hooks/useFetcher";

export default function Post() {
  const [post, setPost] = useState({});

  const { postName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const [res, cleanup] = useFetcher(`/api/blog/${postName}`);

    res.then((r) => {
      if (r.status === 404) navigate("/404");
      else r.json().then(setPost);
    });

    return cleanup;
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

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMemoFetcher from "../hooks/useMemoFetcher";

export default function Post() {
  const [post, setPost] = useState({});

  const { postName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const { res, memo, setMemo, cleanup } = useMemoFetcher(
      `/api/blog/${postName}`
    );

    if (memo) setPost(memo);
    else
      res.then((r) => {
        if (r.status === 404) navigate("/404");
        else r.json().then((e) => (setPost(e), setMemo(e)));
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

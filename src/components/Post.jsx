import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLoading from "../hooks/useLoading";
import useMemoFetcher from "../hooks/useMemoFetcher";

export default function Post() {
  const { postName } = useParams();
  const navigate = useNavigate();

  const { data: post, status } = useMemoFetcher(`/api/blog/${postName}`);
  const { setLoadedRoute } = useLoading();

  useEffect(() => {
    if (status === 404) navigate("/404");
    if (post) setLoadedRoute(`/blog/${postName}`);
  }, [status, post]);

  if (!post) return <div>Loading...</div>;

  return (
    <div
      className="markdown w-full overflow-x-scroll"
      dangerouslySetInnerHTML={{ __html: post.content }}
    ></div>
  );
}

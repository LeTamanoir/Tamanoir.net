import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMemoFetcher from "../hooks/useMemoFetcher";

export default function Post() {
  const { postName } = useParams();
  const navigate = useNavigate();

  const { data: post, status } = useMemoFetcher(`/api/blog/${postName}`);

  useEffect(() => {
    if (status === 404) navigate("/404");
  }, [status]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="flex flex-col w-full">
      <div
        className="markdown w-full overflow-x-scroll mb-20"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </div>
  );
}

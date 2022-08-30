export default function Post({ post }) {
  return post.content === "" ? (
    <div className="text-white">Loading...</div>
  ) : (
    <div
      className="text-white markdown w-full"
      dangerouslySetInnerHTML={{ __html: post.content }}
    ></div>
  );
}

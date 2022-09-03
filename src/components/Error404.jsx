import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="font-extralight text-4xl mb-6"> Error 404</p>
      <Link to="/" className="hover:underline text-lg">
        {"~>"} Index
      </Link>
    </div>
  );
}

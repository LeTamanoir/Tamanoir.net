import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function LoginIcon({ isAnimating }) {
  return (
    <Link
      to="/admin"
      className={`m-2 block ${
        isAnimating ? "pointer-events-none cursor-pointer" : ""
      }`}
    >
      <BsPersonCircle className="w-5 h-5" />
    </Link>
  );
}

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useIsAnimating from "../hooks/useIsAnimating";

const LinkHelper = ({ to, children, isAnimating }) => {
  return (
    <Link
      to={to}
      className={`text-sm sm:text-base whitespace-nowrap mx-5 mb-5 ${
        isAnimating ? "pointer-events-none cursor-pointer" : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default function Header({ route }) {
  const [oldRoute, setOldRoute] = useState(route);
  const [isAnimating, setIsAnimating] = useIsAnimating("isAnimating");

  const titleAnim = useRef(null);

  useEffect(() => {
    titleAnim.current.style.setProperty("--data-steps-type", route.length);
    titleAnim.current.style.setProperty("--data-steps-erase", oldRoute.length);
  }, [route, oldRoute]);

  useEffect(() => {
    // route state doesn't change when reloading
    // the page, so this useEffect isn't triggered

    setIsAnimating(true);

    if (route === oldRoute) {
      setIsAnimating(false);
      return;
    }

    // going to the index
    if (route === "") {
      titleAnim.current.querySelector("span").style.animation =
        "erase 1s steps(var(--data-steps-erase)) forwards";

      titleAnim.current.querySelector("span").onanimationend = () => {
        setOldRoute(route);
        setIsAnimating(false);
      };

      return;
    }

    // leaving index
    if (oldRoute === "") {
      setOldRoute(route);

      titleAnim.current.querySelector("span").style.animation =
        "type 1s steps(var(--data-steps-type))";

      titleAnim.current.querySelector("span").onanimationend = () => {
        setIsAnimating(false);
      };

      return;
    }

    // navigating outside of the index
    if (oldRoute !== "") {
      titleAnim.current.querySelector("span").style.animation =
        "erase 1s steps(var(--data-steps-erase))";

      titleAnim.current.querySelector("span").onanimationend = () => {
        setOldRoute(route);

        titleAnim.current.querySelector("span").style.animation =
          "type 1s steps(var(--data-steps-type))";

        titleAnim.current.querySelector("span").onanimationend = () => {
          setIsAnimating(false);
        };
      };
    }
  }, [route]);

  return (
    <header
      className={`flex flex-col items-center transition-[margin,transform] duration-700 ${
        route !== "" ? "mt-10" : "mt-[50vh] -translate-y-1/2"
      }`}
    >
      <h1 className="hidden">Tamanoir.net</h1>

      <div className="text-xl sm:text-2xl lg:text-4xl text-center flex">
        <Link
          to="/"
          className={isAnimating ? "pointer-events-none cursor-pointer" : ""}
        >
          {"<> Hello Friend"}
        </Link>

        <div ref={titleAnim} className="ml-5 type-anim">
          <span>{oldRoute}</span>
        </div>
      </div>

      <nav className="flex flex-wrap justify-center mt-10">
        <LinkHelper isAnimating={isAnimating} to="/about">
          {"?="} About
        </LinkHelper>
        <LinkHelper isAnimating={isAnimating} to="/projects">
          {"^="} Projects
        </LinkHelper>
        <LinkHelper isAnimating={isAnimating} to="/contact">
          {"&="} Contact
        </LinkHelper>
        <LinkHelper isAnimating={isAnimating} to="/blog">
          {"/="} Blog
        </LinkHelper>
      </nav>
    </header>
  );
}

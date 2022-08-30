import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { BsLaptop, BsMoonStars, BsSun } from "react-icons/bs";

export default function ColorTheme({}) {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  const themes = {
    light: <BsSun size={22} />,
    dark: <BsMoonStars size={22} />,
    system: <BsLaptop size={22} />,
  };

  useEffect(() => {
    if (
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="absolute top-4 right-4">
      <button
        className="theme-icon m-2 transition-colors"
        onClick={() =>
          setTheme(
            Object.keys(themes)[(Object.keys(themes).indexOf(theme) + 1) % 3]
          )
        }
      >
        {themes[theme]}
      </button>
    </div>
  );
}

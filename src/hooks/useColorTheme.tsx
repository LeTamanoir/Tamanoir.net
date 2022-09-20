import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorTheme = () => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

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

  return {
    theme: theme as "light" | "dark" | "system",
    setTheme,
    isDark: theme !== "light",
  };
};

export default useColorTheme;

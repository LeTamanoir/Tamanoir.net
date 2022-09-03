import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

export default function useColorTheme() {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [isDark, setIsDark] = useState(undefined);

  useEffect(() => {
    if (
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return [theme, setTheme, isDark];
}

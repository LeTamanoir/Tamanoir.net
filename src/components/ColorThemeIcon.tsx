import { BsLaptop, BsMoonStars, BsSun } from "react-icons/bs";
import useColorTheme from "../hooks/useColorTheme";

const ColorThemeIcon = () => {
  const { theme, setTheme } = useColorTheme();

  const themes = {
    light: <BsSun className="w-5 h-5" />,
    dark: <BsMoonStars className="w-5 h-5" />,
    system: <BsLaptop className="w-5 h-5" />,
  };

  return (
    <button
      className="m-2 transition-colors text-black dark:text-white"
      onClick={() =>
        setTheme(
          Object.keys(themes)[(Object.keys(themes).indexOf(theme) + 1) % 3]
        )
      }
    >
      {themes[theme]}
    </button>
  );
};

export default ColorThemeIcon;

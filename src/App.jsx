import { Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import routeHelper from "./lib/routes";
import TransitionRoutes from "./components/TransitionRoutes";
import Error404 from "./components/Error404";
import Posts from "./components/Posts";
import Post from "./components/Post";
import ColorThemeIcon from "./components/ColorThemeIcon";
import LoginIcon from "./components/LoginIcon";
import Admin from "./components/Admin";
import useColorTheme from "./hooks/useColorTheme";
import { useState } from "react";

export default function App() {
  const location = useLocation();
  const route = routeHelper(location.pathname);
  const [theme, setTheme, isDark] = useColorTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  // route doesn't exist so 404
  if (route === "404") {
    return <Error404 />;
  }

  return (
    <>
      <Header {...{ route, isAnimating, setIsAnimating }} />

      <div className="flex sm:absolute sm:top-2 sm:right-2">
        <ColorThemeIcon {...{ theme, setTheme }} />
        <LoginIcon isAnimating={isAnimating} />
      </div>

      <TransitionRoutes {...{ location, route }}>
        <Route path="/" element={null} />

        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin" element={<Admin isDark={isDark} />} />

        <Route path="blog" element={<Blog />}>
          <Route path="" element={<Posts />} />
          <Route path=":postName" element={<Post />} />
        </Route>
      </TransitionRoutes>
    </>
  );
}

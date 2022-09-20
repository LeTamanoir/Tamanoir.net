import { Route, useLocation } from "react-router-dom";
import Header from "./components/Header";

import routeHelper from "./lib/routes";

import LoadingWrapper from "./components/LoadingWrapper";
import ColorThemeIcon from "./components/ColorThemeIcon";
import LoginIcon from "./components/LoginIcon";

import Posts from "./components/Posts";
import Post from "./components/Post";

import About from "./routes/About";
import Projects from "./routes/Projects";
import Contact from "./routes/Contact";
import Blog from "./routes/Blog";
import Error404 from "./routes/Error404";
import Admin from "./routes/Admin";
import LoadingIcon from "./components/LoadingIcon";

const App: React.FC = () => {
  const location = useLocation();
  const route = routeHelper(location.pathname);

  if (route === "404") {
    return <Error404 />;
  }

  document.title =
    route !== "" ? route.split(" ")[1] + " - Tamanoir.net" : "Tamanoir.net";

  return (
    <>
      <Header route={route} />

      <div className="flex sm:absolute sm:top-2 sm:right-2">
        <LoadingIcon />
        <ColorThemeIcon />
        <LoginIcon />
      </div>

      <LoadingWrapper location={location}>
        <Route path="/" element={null} />

        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin" element={<Admin />} />

        <Route path="blog" element={<Blog />}>
          <Route path="" element={<Posts />} />
          <Route path=":postName" element={<Post />} />
        </Route>
      </LoadingWrapper>
    </>
  );
};

export default App;

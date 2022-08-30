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
import ColorTheme from "./components/ColorTheme";

export default function App() {
  const location = useLocation();
  const route = routeHelper(location.pathname);

  // route doesn't exist so 404
  if (route === "404") {
    return <Error404 />;
  }

  return (
    <>
      <Header route={route} />

      <ColorTheme />

      <TransitionRoutes location={location} route={route}>
        <Route path="/" element={null} />

        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />

        <Route path="blog" element={<Blog />}>
          <Route path="" element={<Posts />} />
          <Route path=":postName" element={<Post />} />
        </Route>
      </TransitionRoutes>
    </>
  );
}

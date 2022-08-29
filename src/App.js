import { Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Links from "./components/Links";
import Blog from "./components/Blog";
import { routeHelper } from "./lib/routes";
import TransitionRoutes from "./components/TransitionRoutes";

export default function App() {
  const location = useLocation();
  const route = routeHelper[location.pathname];

  return (
    <>
      <Header route={route} />

      <TransitionRoutes location={location} route={route}>
        <Route path="/" element={null} />

        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="links" element={<Links />} />
        <Route path="blog" element={<Blog />} />
      </TransitionRoutes>
    </>
  );
}

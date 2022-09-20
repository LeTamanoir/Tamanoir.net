const routes = {
  "/": "", // the index
  "/about": "?= About",
  "/projects": "^= Projects",
  "/contact": "&= Contact",
  "/blog": "/= Blog",
  "/admin": ">>= Admin",
  "/404": "404",
};

export const staticRoutes = ["/", "/about", "/projects", "/contact", "/404"];

const routeHelper = (location: string) => {
  if (location in routes) return routes[location as keyof typeof routes];
  else if (location.match(/\/blog\/.*/g)) return routes["/blog"];
  else return "404";
};

export default routeHelper;

const routes = {
  "/": "", // the index
  "/about": "?= About",
  "/projects": "^= Projects",
  "/contact": "&= Contact",
  "/blog": "/= Blog",
};

const routeHelper = (location) => {
  if (location in routes) return routes[location];
  else if (location.match(/\/blog\/.*/g)) return routes["/blog"];
  else return "404";
};

export default routeHelper;

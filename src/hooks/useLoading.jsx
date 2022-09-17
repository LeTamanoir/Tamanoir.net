import { staticRoutes } from "../lib/routes";

const LOADED_URLS = new Set(staticRoutes);

export default function useLoading() {
  const setLoadedRoute = (route) => LOADED_URLS.add(route);

  const hasToLoad = (route) => !LOADED_URLS.has(route);

  return { hasToLoad, setLoadedRoute };
}

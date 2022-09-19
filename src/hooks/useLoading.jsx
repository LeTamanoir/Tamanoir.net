import useLocalStorage from "./useLocalStorage";

export default function useLoading() {
  const [showLoad, setShowLoad] = useLocalStorage("load", "true");

  return { showLoad, setShowLoad };
}

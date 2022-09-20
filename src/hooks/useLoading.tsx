import useLocalStorage from "./useLocalStorage";

const useLoading = () => {
  const [showLoad, setShowLoad] = useLocalStorage("load", "true");

  return { showLoad, setShowLoad };
};

export default useLoading;

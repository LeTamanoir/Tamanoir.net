import useGlobalState from "./useGlobalState";

const useIsAnimating = () => {
  const [isAnimating, setIsAnimating] = useGlobalState("isAnimating", false);

  return [isAnimating, setIsAnimating];
};

export default useIsAnimating;

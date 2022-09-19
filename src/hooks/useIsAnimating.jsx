import useGlobalState from "./useGlobalState";

export default function useIsAnimating() {
  const [isAnimating, setIsAnimating] = useGlobalState("isAnimating", false);

  return [isAnimating, setIsAnimating];
}

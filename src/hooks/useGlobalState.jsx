import { useEffect, useState } from "react";

const listeners = new Map();

export default function useGlobalState(key, initialState) {
  const [state, setState] = useState(initialState);

  const setGlobalState = (newGlobalState) => {
    listeners.get(key).forEach((listener) => listener(newGlobalState));
  };

  useEffect(() => {
    if (!listeners.has(key)) {
      listeners.set(key, new Set());
    }

    const listener = (state) => setState(state);

    listeners.get(key).add(listener);

    return () => listeners.get(key).delete(listener);
  }, []);

  return [state, setGlobalState];
}

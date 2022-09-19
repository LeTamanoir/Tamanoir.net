import { useEffect, useState } from "react";

const listeners = {};

export default function useGlobalState(key, initialState) {
  const [state, setState] = useState(initialState);

  const setGlobalState = (nextGlobalState) => {
    listeners[key].forEach((listener) => listener(nextGlobalState));
  };

  useEffect(() => {
    if (!listeners.hasOwnProperty(key)) {
      listeners[key] = new Set();
    }

    const listener = (state) => setState(state);

    listeners[key].add(listener);

    return () => listeners[key].delete(listener);
  }, []);

  return [state, setGlobalState];
}

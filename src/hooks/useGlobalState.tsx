import { useEffect, useState } from "react";

type Listener = (state: any) => void;

const listeners = new Map();

const useGlobalState = (
  key: string,
  initialState?: any
): [any, (state: any) => void] => {
  const [state, setState] = useState(initialState);

  const setGlobalState = (newGlobalState: any) => {
    listeners
      .get(key)
      .forEach((listener: Listener) => listener(newGlobalState));
  };

  useEffect(() => {
    if (!listeners.has(key)) {
      listeners.set(key, new Set());
    }

    const listener: Listener = (state) => setState(state);

    listeners.get(key).add(listener);

    return () => listeners.get(key).delete(listener);
  }, []);

  return [state, setGlobalState];
};

export default useGlobalState;

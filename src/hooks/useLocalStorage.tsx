import { useEffect } from "react";
import useGlobalState from "./useGlobalState";

export default function useLocalStorage(
  key: string,
  defaultValue: string
): [string, (state: string) => void] {
  const [data, setData] = useGlobalState(key, "init");

  useEffect(() => {
    let localData = localStorage.getItem(key);

    if (!localData) {
      setData(defaultValue);
      localStorage.setItem(key, defaultValue);
    } else {
      setData(localData);
    }
  }, []);

  useEffect(() => {
    if (data === "init") return;

    localStorage.setItem(key, data);
  }, [data]);

  return [data, setData];
}

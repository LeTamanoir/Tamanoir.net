import { useEffect } from "react";
import useGlobalState from "./useGlobalState";

const useLocalStorage = (
  key: string,
  defaultValue: string
): [string, (state: any) => void] => {
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
};

export default useLocalStorage;

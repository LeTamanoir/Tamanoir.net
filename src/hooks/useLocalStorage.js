import { useEffect, useState } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [data, setData] = useState("init");

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
    // console.log(data);
    localStorage.setItem(key, data);
  }, [data]);

  return [data, setData];
}

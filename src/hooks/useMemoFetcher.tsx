import { useEffect, useState } from "react";
import useFetcher from "./useFetcher";

const FETCHED_URLS = new Map();

const useMemoFetcher = <T,>(url: string) => {
  const [data, setData] = useState(null as any);
  const [error, setError] = useState(null as any);
  const [status, setStatus] = useState(null as any);

  useEffect(() => {
    if (FETCHED_URLS.has(url)) {
      setData(FETCHED_URLS.get(url));
      return;
    }

    const [res, cleanup] = useFetcher(url);

    res
      .then((r) => {
        setStatus(r.status);
        return r.json();
      })
      .then(setData)
      .catch(setError);

    return cleanup;
  }, []);

  useEffect(() => {
    if (data) FETCHED_URLS.set(url, data);
  }, [data]);

  return { data: data as T, error, status };
};

export default useMemoFetcher;

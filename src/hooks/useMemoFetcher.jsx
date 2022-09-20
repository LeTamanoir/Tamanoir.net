import { useEffect, useState } from "react";
import useFetcher from "./useFetcher";

const FETCHED_URLS = new Map();

export default function useMemoFetcher(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

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

  return { data, error, status };
}

import useFetcher from "./useFetcher";

const FETCHED_URLS = {};

export default function useMemoFetcher(url) {
  if (FETCHED_URLS.hasOwnProperty(url)) {
    return {
      res: null,
      memo: FETCHED_URLS[url],
      setMemo: null,
      cleanup: () => {},
    };
  }

  const [res, cleanup] = useFetcher(url);

  const setMemo = (data) => (FETCHED_URLS[url] = data);

  return { res, memo: false, setMemo, cleanup };
}

export default function useFetcher(
  url: string,
  options = {}
): [Promise<Response>, () => void] {
  const controller = new AbortController();

  const res = fetch(url, {
    ...options,
    signal: controller.signal,
  });

  const cleanup = () => controller.abort();

  return [res, cleanup];
}

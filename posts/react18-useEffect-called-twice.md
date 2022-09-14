---
title: React 18 useEffect called 2x
description: useEffect strange behaviors explained
date: 14/09/2022
---

# React 18 useEffect hook called twice

In react 18 when you are using `strictmode` all useEffect hooks are called twice. This is because `strictmode` unmounts and re-mounts every component to detect [unsafe lifecycles](https://reactjs.org/docs/strict-mode.html#identifying-unsafe-lifecycles). Also, `strictmode` does these operations only during development to help you make faster and safer react components.

If you don't want this behavior to happen then you can simply remove `strictmode` :

```js
root.render(
  // <StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </StrictMode>
);
```

Or you can adapt your app. I think it's the right approach :).
In this website I was using a lot of useEffects to trigger data fetching like so :

```js
const fetchSomething = async () => {
  const res = await fetch("/some-route");
  const data = await res.json();
  setData(data);
};

useEffect(() => {
  fetchSomething();
}, []);
```

The problem with this approach is that you can't cancel the request, therefore because of `strictmode` the `useEffect` will run twice and fetch your data twice. In reality, it's not that bad, but if you are fetching large amounts of data it can become a problem. Especially if the user is switching between routes extremely fast then the request won't be cleaned and useless bandwidth will be used.

A simple solution to this problem is to use an `AbortController`, I made a custom hook that helps with its integration :

```js
export default function useFetcher(url, options) {
  const controller = new AbortController();

  const res = fetch(url, {
    ...options,
    signal: controller.signal,
  });

  const cleanup = () => controller.abort();

  return [res, cleanup];
}
```

You can then use it like this inside of a `useEffect` :

```js
useEffect(() => {
  const [res, cleanup] = useFetcher("/some-route");

  res.then((r) => r.json()).then(setData);

  return cleanup;
  // or
  // return () => cleanup()
}, []);
```

And that's it :)

Thanks for reading <3

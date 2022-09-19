import { Suspense, lazy, useEffect, useState } from "react";
import useFetcher from "../hooks/useFetcher";
const TerminalWrapper = lazy(() => import("../components/TerminalWrapper"));

const InputHelper = ({ type, name }) => (
  <input
    className="text-black bg-white border-2 border-black mb-4 p-2 rounded-md"
    type={type}
    placeholder={name}
    name={name}
  />
);

export default function Admin() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const { auth, message } = await res.json();

    if (auth) setIsAuthed(true);
    else {
      setIsAuthed(false);
      setError(message);
      setTimeout(() => setError(""), 3000);
    }
  };

  useEffect(() => {
    const [res, cleanup] = useFetcher("/api/login");

    res.then((r) => r.json()).then(({ auth }) => setIsAuthed(auth));

    return cleanup;
  }, []);

  return isAuthed ? (
    <Suspense fallback={<div>Loading...</div>}>
      <TerminalWrapper setIsAuthed={setIsAuthed} />
    </Suspense>
  ) : (
    <form onSubmit={onSubmit} className="flex items-center flex-col my-10">
      <InputHelper name="username" type="text" />
      <InputHelper name="password" type="password" />

      {error && <div className="text-red-500 mb-3">{error}</div>}

      <input
        className="dark:text-white hover:underline hover:cursor-pointer"
        type="submit"
        value="Login"
      />
    </form>
  );
}

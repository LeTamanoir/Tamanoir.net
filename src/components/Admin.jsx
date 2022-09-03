import { useEffect, useState } from "react";
import TerminalWrapper from "./TerminalWrapper";

const InputHelper = ({ type, name }) => (
  <input
    className="text-black bg-white border-2 border-black mb-4 p-2 rounded-md"
    type={type}
    placeholder={name}
    name={name}
  />
);

export default function Admin({ isDark }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [error, setError] = useState("");

  const checkAuth = async () => {
    const res = await fetch("/api/login");
    const { auth } = await res.json();

    setIsAuthed(auth);
  };

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
    checkAuth();
  }, []);

  return isAuthed ? (
    <TerminalWrapper isDark={isDark} setIsAuthed={setIsAuthed} />
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

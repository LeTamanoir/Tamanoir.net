import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Terminal } from "xterm";

export default function TerminalWrapper({ isDark, setIsAuthed }) {
  const terminalRef = useRef(null);
  const terminal = useRef();
  const socket = useRef();

  const colWidth = 9;
  const colHeight = 20;

  const handleResize = () => {
    let { innerHeight, innerWidth } = window;

    let cols = parseInt((innerWidth - innerWidth / 3) / colWidth);
    let rows = parseInt((innerHeight - innerHeight / 3) / colHeight);

    terminal.current.resize(cols, rows);
    socket.current.emit("resize", { cols, rows });
  };

  const loadStyle = () => {
    if (!terminal.current) return;

    terminal.current.options = {
      theme: {
        background: isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)",
        foreground: isDark ? "#dfdfdf" : "#1f1f1f",
        cursor: isDark ? "#dfdfdf" : "#1f1f1f",
        cursorAccent: isDark ? "#1f1f1f" : "#dfdfdf",
      },
      fontWeight: "normal",
      fontFamily: "JetBrains Mono",
    };
  };

  useEffect(() => {
    socket.current = io();
    terminal.current = new Terminal({ allowTransparency: true });
    terminal.current.open(terminalRef.current);

    loadStyle();
    handleResize();

    terminal.current.onData((data) => socket.current.emit("input", data));
    socket.current.on("output", (data) => terminal.current.write(data));
    socket.current.on("disconnect", () => setIsAuthed(false));

    window.addEventListener("resize", handleResize);

    return () => {
      socket.current.close();
      terminal.current.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => loadStyle(), [isDark]);

  return (
    <div className="flex flex-col-reverse">
      <div
        className="border peer border-black dark:border-white"
        ref={terminalRef}
      ></div>

      <div className="my-2 peer-hover:text-transparent font-bold text-center text-red-500 transition-colors">
        Warning : if you change page you will be disconnected
      </div>
    </div>
  );
}

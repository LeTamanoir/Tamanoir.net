const pty = require("node-pty");
const { logOldConn, logNewConn } = require("./lib/logger");

const onConnection = (socket) => {
  logNewConn(socket);

  const ptyProcess = pty.spawn("bash", [], {
    name: "xterm-color",
    cwd: process.env.POSTS_DIR,
    env: process.env,
  });

  ptyProcess.onExit(() => {
    socket.request.session.destroy();
    socket.disconnect(true);
  });

  ptyProcess.onData((data) => socket.emit("output", data));

  socket.on("disconnect", () => {
    ptyProcess.kill();
    logOldConn(socket);
  });

  socket.on("resize", ({ rows, cols }) => ptyProcess.resize(cols, rows));

  socket.on("input", (input) => ptyProcess.write(input));
};

module.exports = { onConnection };

const pty = require("node-pty");

const onConnection = (socket) => {
  console.log(
    `${process.env.BLOG_USERNAME} connected via socket : ${
      socket.id
    } at : ${new Date().toLocaleString()}`
  );

  socket.on("disconnect", () =>
    console.log(
      `${process.env.BLOG_USERNAME} disconnected his socket : ${
        socket.id
      } on : ${new Date().toLocaleString()}`
    )
  );

  const ptyProcess = pty.spawn("bash", [], {
    name: "xterm-color",
    cwd: process.env.POSTS_DIR,
    env: process.env,
  });

  ptyProcess.onExit(() => {
    socket.request.session.destroy();
    socket.disconnect(true);
  });

  ptyProcess.onData((data) => {
    socket.emit("output", data);
  });

  socket.on("resize", ({ rows, cols }) => {
    ptyProcess.resize(cols, rows);
  });

  socket.on("disconnect", (val) => {
    ptyProcess.kill();
  });

  socket.on("input", (input) => {
    ptyProcess.write(input);
  });
};

module.exports = { onConnection };

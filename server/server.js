require("dotenv").config({ path: "./server/.env" });
const express = require("express");
const session = require("express-session");
const { createServer } = require("http");
const socketIO = require("socket.io");
const path = require("path");

const { onConnection } = require("./socket");
const authRouter = require("./auth");
const blogRouter = require("./blog");
const { wrap } = require("./lib/wrap");

const PORT = process.env.PORT || 4000;
const isProd = process.env.NODE_ENV === "production";

const app = express();
const httpServer = createServer(app);
const io = socketIO(httpServer, {
  cors: { origin: isProd ? "tamanoir.net" : "*" },
});
const sessionMiddleware = session({
  name: "session-id",
  saveUninitialized: false,
  resave: false,
  secret: process.env.SECRET_PASSWORD,
});

//= APP

app.use(sessionMiddleware);
app.use(express.json());
app.use(express.static(path.resolve("./build")));

app.use(blogRouter);
app.use(authRouter);

app.get("/*", (_, res) => res.sendFile(path.resolve("./build/index.html")));

//= IO

io.use(wrap(sessionMiddleware));

io.use((socket, next) => {
  if (socket.request.session?.user?.auth === true) next();
  else next(new Error("unauthorized"));
});

io.on("connection", onConnection);

httpServer.listen(PORT, () => {
  console.log(`server listening on : http://localhost:${PORT}/`);
});

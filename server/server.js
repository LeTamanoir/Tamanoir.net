require("dotenv").config({ path: "./server/.env" });
const express = require("express");
const session = require("express-session");
const { createServer } = require("http");
const socketIO = require("socket.io");
const path = require("path");

const { onConnection } = require("./socket");
const { showPost, showPosts } = require("./blog");
const { authUser, isAuthed } = require("./auth");

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
const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

app.use(sessionMiddleware);
app.use(express.json());
app.use(express.static(path.resolve("./build")));

app.get("/api/blog", showPosts);
app.get("/api/blog/:postName", showPost);

app.get("/api/login", isAuthed);
app.post("/api/login", authUser);

app.get("/*", (_, res) => res.sendFile(path.resolve("./build/index.html")));

io.use(wrap(sessionMiddleware));

io.use((socket, next) => {
  console.log(socket.request.session.user);

  if (process.env.BLOG_USERNAME === "") next(new Error("unauthorized"));

  if (socket.request.session.user?.username === process.env.BLOG_USERNAME)
    next();
  else next(new Error("unauthorized"));
});

io.on("connection", onConnection);

httpServer.listen(PORT, () => {
  console.log(`server listening on : http://localhost:${PORT}/`);
});

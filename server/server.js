import * as dotenv from "dotenv";
dotenv.config({ path: "./server/.env" });

import express from "express";
import session from "express-session";
import { createServer } from "http";
import { Server } from "socket.io";
import Database from "better-sqlite3";
import sessionStoreAdapter from "better-sqlite3-session-store";

import { onConnection } from "./socket.js";
import authRouter from "./auth.js";
import blogRouter from "./blog.js";
import { wrap } from "./lib/wrap.js";

const PORT = process.env.PORT || 4000;
const isProd = process.env.NODE_ENV === "production";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: isProd ? "tamanoir.net" : "*" },
});
const SessionStore = sessionStoreAdapter(session);
const SessionStoreDB = new Database("./server/db/session.sqlite", {});
const sessionMiddleware = session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.SECRET_PASSWORD,
  proxy: isProd,
  store: new SessionStore({
    client: SessionStoreDB,
    expired: {
      clear: true,
      intervalMs: 1000 * 60 * 15,
      //         1sec > 1min > 15min
    },
  }),
  cookie: {
    secure: isProd,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 5,
    //    1sec > 1min > 1hr > 5hr
  },
});

//=========//
// APP     //
//=========//

if (isProd) app.set("trust proxy", 1);
app.use(sessionMiddleware);
app.use(express.json());

app.use(blogRouter);
app.use(authRouter);

//=================================================================================//
// handled by nginx                                                                //
//                                                                                 //
// app.use(express.static(path.resolve("./dist")));                                //
// app.get("/*", (_, res) => res.sendFile(path.resolve("./dist/index.html")));     //
//=================================================================================//

//=========//
// IO      //
//=========//

const authMiddleware = (socket, next) => {
  if (socket.request.session?.user?.auth === true) next();
  else next(new Error("unauthorized"));
};

io.use(wrap(sessionMiddleware));
io.use(authMiddleware);

io.on("connection", onConnection);

httpServer.listen(PORT, () => {
  console.log(`server listening on : http://localhost:${PORT}/`);
});

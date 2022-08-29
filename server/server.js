require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.static(path.resolve("./build")));

app.get("/api/blog", (req, res) => {
  // TODO add md directory parser

  res.json({ hello: "lol" });
});

app.get("/*", (req, res) => {
  res.sendFile(path.resolve("./build/index.html"));
});

app.listen(PORT, () =>
  console.log(`server listening on : http://localhost:${PORT}/`)
);

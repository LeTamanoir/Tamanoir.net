require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const matter = require("gray-matter");
const markdown = require("./lib/markdown");

const PORT = process.env.PORT || 4000;
const POSTS = process.env.POSTS || path.resolve("./posts");

app.use(express.static(path.resolve("./build")));

app.get("/api/blog", (req, res) => {
  const posts = [];

  fs.readdirSync(POSTS).forEach((post) => {
    let postPath = path.resolve("./posts", post);
    let postContent = fs.readFileSync(postPath);
    let { data } = matter(postContent);

    posts.push({ ...data, href: encodeURIComponent(post) });
  });

  res.json(posts);
});

app.get("/api/blog/:postName", (req, res) => {
  const { postName } = req.params;
  const postPath = path.resolve("./posts", postName);

  if (!postPath.startsWith(POSTS)) return res.sendStatus(403);
  if (!fs.existsSync(postPath)) return res.sendStatus(404);

  const { content } = matter(fs.readFileSync(postPath));
  const post = { content: markdown.render(content) };
  res.json(post);
});

app.get("/*", (req, res) => {
  res.sendFile(path.resolve("./build/index.html"));
});

app.listen(PORT, () =>
  console.log(`server listening on : http://localhost:${PORT}/`)
);

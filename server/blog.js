import { Router } from "express";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import markdown from "./lib/markdown.js";

const blogRouter = Router();

blogRouter.get("/api/blog", (_, res) => {
  const posts = [];

  fs.readdirSync(process.env.POSTS_DIR).forEach((post) => {
    let postPath = path.resolve("./posts", post);
    let postContent = fs.readFileSync(postPath);
    let { data } = matter(postContent);

    posts.push({ ...data, href: encodeURIComponent(post) });
  });

  const dateHelper = (d) =>
    new Date(d.date.split("/").reverse().join("/")).getTime();

  posts.sort((a, b) => dateHelper(b) - dateHelper(a));

  res.json(posts);
});

blogRouter.get("/api/blog/:postName", (req, res) => {
  const { postName } = req.params;
  const postPath = path.resolve(process.env.POSTS_DIR, postName);

  if (!postPath.startsWith(path.resolve(process.env.POSTS_DIR)))
    return res.sendStatus(403);
  if (!fs.existsSync(postPath)) return res.sendStatus(404);

  const { content } = matter(fs.readFileSync(postPath));
  const post = { content: markdown.render(content) };
  res.json(post);
});

export default blogRouter;

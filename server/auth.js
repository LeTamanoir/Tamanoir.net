const isAuthed = (req, res) => {
  if (req.session.user) return res.json({ auth: true });

  res.json({ auth: false });
};

const authUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.json({ auth: false, message: "complete all fields" });
  if (!process.env.BLOG_USERNAME || !process.env.BLOG_PASSWORD)
    return res.sendStatus(403);

  if (
    process.env.BLOG_USERNAME === username &&
    process.env.BLOG_PASSWORD === password
  ) {
    req.session.user = { username: process.env.BLOG_USERNAME };
    req.session.save(() => res.json({ auth: true }));
    return;
  }

  res.json({ auth: false, message: "bad username or password" });
};

module.exports = { isAuthed, authUser };

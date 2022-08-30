const markdownitEmoji = require("markdown-it-emoji");
const MarkdownIt = require("markdown-it");
const hljs = require("highlight.js");
const imsize_plugin = require("markdown-it-imsize");

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: (str, lang) =>
    '<pre class="hljs"><code>' +
    hljs.highlight(str, { language: lang }).value +
    "</code></pre>",
})
  .use(markdownitEmoji)
  .use(imsize_plugin);

module.exports = markdown;

import markdownitEmoji from "markdown-it-emoji";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import imsize_plugin from "markdown-it-imsize";

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

export default markdown;

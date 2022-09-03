/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        black: "#1f1f1f",
        white: "#dfdfdf",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

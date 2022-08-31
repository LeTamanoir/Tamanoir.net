/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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

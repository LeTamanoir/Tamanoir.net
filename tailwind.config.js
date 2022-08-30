/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

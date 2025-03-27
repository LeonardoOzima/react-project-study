/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navbarprimary: "#202225",
        navbarsecondary: "#5865f2",
      },
    },
  },
  plugins: [],
};

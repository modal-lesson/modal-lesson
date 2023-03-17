/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0891b2",
          secondary: "#3F3F46",
          accent: "#f59e0b",
          neutral: "#27272a",
          "base-100": "#18181b",
          info: "#60a5fa",
          success: "#22c55e",
          warning: "#facc15",
          error: "#e11d48",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};

module.exports = config;

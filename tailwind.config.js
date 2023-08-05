/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#344E41",

        secondary: "#A3B18A",
        accent: "#FFB347", // Another consideration #FFD700
        neutral: "#333333",
        "base-100": "#DAD7CD",
        info: "",
        success: "",
        warning: "",
        error: "",
        "primary-hover": "#253830",
      },
      fontFamily: {
        heading: ["IBM Plex Serif", "serif"],
        // heading: "var(--font-heading)",
      },
    },
    plugins: [require("@tailwindcss/typography")],
  },
};

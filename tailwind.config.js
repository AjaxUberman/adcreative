/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "pastel-mavi": "#BED7DC",
        "retro-yesil": "#15F5BA",
        "hover-yesil": "#7ED7C1",
        "retro-mor": "#6F61C0",
        "fistik-yesil": "#E2F4C5",
      },
      boxShadow: {
        ince: "1.95px 1.95px 2.6px  rgba(0, 0, 0, 0.15) ",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

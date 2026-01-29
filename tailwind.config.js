/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#B8C0FF",
        accentLight: "#C8B6FF",
        accentDark: "#8A7CCF",
        peach: "#E7C6FF",
        lavender: "#BBD0FF",
        ink: "#1f1f3a",
      },
      boxShadow: {
        soft: "0 25px 60px -35px rgba(138, 124, 207, 0.45)",
      },
    },
  },
  plugins: [],
};

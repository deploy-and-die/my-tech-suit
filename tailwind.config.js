/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#5b5ce6",
        accentLight: "#7c7cf2",
        accentDark: "#2f2f6b",
        peach: "#fde8dd",
        lavender: "#ececff",
        ink: "#1f1f3a",
      },
      boxShadow: {
        soft: "0 20px 60px -30px rgba(47, 47, 107, 0.45)",
      },
    },
  },
  plugins: [],
};

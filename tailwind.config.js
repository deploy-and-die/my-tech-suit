/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
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
        card: "0 25px 55px -35px rgba(54, 67, 138, 0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        shimmer: "shimmer 5s linear infinite",
      },
    },
  },
  plugins: [],
};

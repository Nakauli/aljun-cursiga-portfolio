/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 0 36px rgba(34, 211, 238, 0.22)",
        panel: "0 24px 80px rgba(7, 18, 32, 0.24)",
      },
      animation: {
        "slow-pan": "slow-pan 18s linear infinite",
        "pulse-line": "pulse-line 3.5s ease-in-out infinite",
      },
      keyframes: {
        "slow-pan": {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-64px, -64px, 0)" },
        },
        "pulse-line": {
          "0%, 100%": { opacity: "0.24" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

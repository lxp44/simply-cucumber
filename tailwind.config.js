/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./styles/**/*.{css}"],
  theme: {
    extend: {
      colors: {
        cucumber: {
          50: "#f2fbf6",
          100: "#dff7e9",
          200: "#bff0d3",
          300: "#8fe2b3",
          400: "#56cf8b",
          500: "#2eb96b",
          600: "#1f9654",
          700: "#1b7845",
          800: "#185e37",
          900: "#0f3a22"
        }
      }
    }
  },
  plugins: []
};


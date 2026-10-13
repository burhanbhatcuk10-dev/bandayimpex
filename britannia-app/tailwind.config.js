/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Inter", "sans-serif"],
        display: ["'Bebas Neue'", "Impact", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#f3f6fb",
          100: "#e7ebf3",
          200: "#d3d9e6",
          300: "#b1b9cd",
          400: "#8c97b3",
          500: "#6a7799",
          600: "#4f5c7e",
          700: "#3a4563",
          800: "#29324b",
          900: "#1b2235",
          950: "#0f131e",
          DEFAULT: "#1b2235",
        },
        secondary: {
          50: "#f9fbfd",
          100: "#f3f6fb",
          200: "#e7ebf3",
          300: "#d3d9e6",
          400: "#b1b9cd",
          DEFAULT: "#f3f6fb",
        },
        ink: "#1b2235",
        muted: "#6a7799",
        line: "#d3d9e6",
      },
      keyframes: {
        "toast-in": {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.96)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "toast-in": "toast-in 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

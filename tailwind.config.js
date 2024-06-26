/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "bounce-slow": " bounce 0.1s infinite",
        "pulse-fast": "pulse 1.3s cubic-bezier(0, 1, 1, 1) infinite",
      },
    },
  },
  plugins: [],
};

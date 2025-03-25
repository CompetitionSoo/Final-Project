/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a56db",
        secondary: "#7c3aed",
        dark: "#111827",
        deepskyblue: "#00bfff",
        bg1:"#FFDCDCDC"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        korea: ['KCC-Ganpan'],
        korea2: ['Gyeonggi_Batang_Regular'],
        korea3: ['NanumSquareNeoHeavy']
      },
    },
  },
  plugins: [],
} 
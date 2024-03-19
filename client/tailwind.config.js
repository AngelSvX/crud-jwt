
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        titleTable: ['Kanit', 'sans-serif'],
        textTable: ['Outfit', 'sans-serif'],
        archivo: ['Archivo', 'sans-serif'],
        merriweather : ['Merriweather', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        dosis: ['Dosis', 'sans-serif'],
        navFont: ['Varela Round', 'sans-serif']
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require('daisyui')
  ],
};
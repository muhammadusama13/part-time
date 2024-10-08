/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#07484A',
          dark: '#70908B'
        },
        liteGreen: '#E0F6F1'
      },
      screens: {
        '3xl': '1600px',
        '4xl': '1875px'
      },
      fontFamily: {
        'Roboto': ['Roboto', 'sans-serif'],
        'playfair-display': ["Playfair Display", 'serif']
      },
    },
  },
  plugins: [],
}
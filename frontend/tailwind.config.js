/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ruby: {
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f8d0d7',
          300: '#f4aab7',
          400: '#ed758c',
          500: '#e54c6c', // Ruby principal
          600: '#d22a4f',
          700: '#b01d41',
          800: '#931b3b',
          900: '#7c1c37',
          950: '#450a1a',
        },
        dark: {
          50: '#f6f6f7',
          100: '#e2e3e7',
          200: '#c4c6ce',
          300: '#9fa3af',
          400: '#7b7f8e',
          500: '#5f6375',
          600: '#4a4d5d',
          700: '#3d404d',
          800: '#2e3039', // Fundo escuro principal
          900: '#1f2028',
          950: '#121318',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

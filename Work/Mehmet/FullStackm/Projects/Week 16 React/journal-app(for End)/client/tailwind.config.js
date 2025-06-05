/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enable class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        galacticBlue: {
          light: '#3B82F6', // bright blue
          dark: '#1E3A8A',  // dark blue
          midnight: '#0F172A', // very dark navy
        },
      },
    },
  },
  plugins: [],
}

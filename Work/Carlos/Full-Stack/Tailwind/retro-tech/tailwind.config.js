/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#181824',
        'medium-blue': '#1f2937',
        'deep-purple': '#3a1c71',
        'light-text': '#e0e7ef',
        'teal-heading': '#30e3ca',
        'purple-link': '#a259f7',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #181824 0%, #1f2937 70%, #3a1c71 100%)',
      },
    },
  },
  plugins: [],
}
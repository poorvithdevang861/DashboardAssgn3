/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A1A3A',      // Very dark navy blue
        secondary: '#2A3B5A',    // Lighter dark blue
        accent: '#DC143C',       // Vibrant red
        highlight: '#FF8C94',    // Coral/salmon red
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


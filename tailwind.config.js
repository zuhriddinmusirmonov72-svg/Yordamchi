/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'nova-purple': '#8B5CF6',
        'nova-blue': '#3B82F6',
      },
    },
  },
  plugins: [],
}

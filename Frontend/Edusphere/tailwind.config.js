/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Finlandica Headline"', 'sans-serif'],
      },
    },
  },
  // plugins: [],
  plugins: [
    require('@tailwindcss/forms'),
  ],
}


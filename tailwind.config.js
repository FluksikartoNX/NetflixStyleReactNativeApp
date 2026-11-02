/** @type {import('tailwindcss').Config} */
module.exports = {
  // Every file that uses `className` must be matched here.
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#E50914',
          dark: '#B20710',
        },
        background: '#141414',
      },
    },
  },
  plugins: [],
};

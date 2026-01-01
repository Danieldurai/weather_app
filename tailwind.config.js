/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'spin-y': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'translateX(100%)', opacity: '0' }
        },
        'flicker': {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '1' },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.4' },
        }
      },
      animation: {
        'spin-y': 'spin-y 4s linear infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite', 
        'flicker': 'flicker 3s linear infinite',
      },
    },
  },
  plugins: [],
};
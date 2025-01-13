/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        bgButton: '#EC4899',
      },
      borderColor: {
        border: '#EC4899',
      },
    },
  },
  plugins: [require('daisyui')],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',   // ★★★ 加上这一句！★★★
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        darkBg: '#0a0a17',
        darkBgAlt: '#0f0f1b',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom right, #0f0f1b, #0a0a17, #000)',
      },
    },
  },
  plugins: [],
};

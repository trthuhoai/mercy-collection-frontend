// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-50': '#f0fdf4',
        'primary-100': '#dcfce7',
        'primary-200': '#bbf7d0',
        'primary-300': '#86efac',
        'primary-400': '#4ade80',
        'primary-500': '#22c55e',
        'primary-600': '#16a34a',
        'primary-700': '#15803d',
      },
      backgroundImage: {
        detail: "url('./assets/img/bg-about.png')",
      },
    },
    container: {
      padding: '2rem',
      center: true,
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
      addVariant('parent-hover', '.parent:hover > &');
      addVariant('child-all', '& *');
    },
  ],
};

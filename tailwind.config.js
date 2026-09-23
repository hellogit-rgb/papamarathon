/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        heading: ['Oswald', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        ink: '#0e0d0b',
        charcoal: '#1a1815',
        stone: '#2a2724',
        cream: '#f5f1ea',
        bone: '#e8e2d6',
        copper: '#b87333',
        ember: '#d4793a',
        moss: '#6b7a4f',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        'editorial': '1400px',
      },
    },
  },
  plugins: [],
};

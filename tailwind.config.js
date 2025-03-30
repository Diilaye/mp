/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D66630',
        accent: '#D4AF37',
        offwhite: '#F5F5F5',
        lightgray: '#EAEAEA',
        beige: '#F4EFE6',
        cream: "#FCF5EF",
        success: "#6b9f36",
        orange: "#f9cd92",
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.2' }],
        'custom-8': '8px',
      },
    },
  },
  plugins: [],
};


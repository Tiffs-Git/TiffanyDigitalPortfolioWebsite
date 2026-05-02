/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050d1a',
          900: '#0a1628',
          800: '#0f2040',
          700: '#152a55',
          600: '#1c3a6e',
        },
        teal: {
          900: '#062a2a',
          800: '#0a3d3d',
          700: '#0e5555',
          600: '#126e6e',
          500: '#178787',
          400: '#1fa0a0',
          300: '#3bbcbc',
        },
        gold: {
          900: '#2a1f00',
          800: '#4a3700',
          700: '#6b5000',
          600: '#8c6900',
          500: '#b08830',
          400: '#c9a04a',
          300: '#d9b86a',
          200: '#e8cf9a',
          100: '#f4e8cc',
        },
        copper: {
          600: '#a0522d',
          500: '#bf6c3d',
          400: '#d4814f',
          300: '#e09870',
        },
        warm: {
          100: '#f7f3ee',
          200: '#ede6db',
          300: '#ddd0bf',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'particle-float': 'particleFloat 8s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        particleFloat: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-20px) translateX(10px)' },
          '66%': { transform: 'translateY(10px) translateX(-10px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

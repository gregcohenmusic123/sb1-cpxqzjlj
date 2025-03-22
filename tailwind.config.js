/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/contexts/**/*.{js,ts,jsx,tsx}',
    './src/App.tsx'
  ],
  theme: {
    extend: {
      colors: {
        surface: '#111921',
        primary: '#EEEDF2',
        accent: '#D0FF27',
        background: '#111921'
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace']
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.7 }
        }
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite'
      },
      boxShadow: {
        'accent': '0 0 20px rgba(208, 255, 39, 0.1)',
        'accent-lg': '0 0 30px rgba(208, 255, 39, 0.15)'
      }
    },
  },
  plugins: [],
};
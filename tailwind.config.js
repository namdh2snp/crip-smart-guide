/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A2540',
          dark: '#061726',
          light: '#133961'
        },
        teal: {
          DEFAULT: '#00A896',
          dark: '#008577',
          light: '#1AD1BD'
        },
        surface: {
          DEFAULT: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0'
        },
        sos: {
          DEFAULT: '#E63946',
          dark: '#C82333',
          light: '#FF6B7A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'base': '1rem', // 16px min per constitution
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1a2e',
          light: '#2d2d4a',
        },
        accent: {
          DEFAULT: '#ff6b35',
          hover: '#ff8c5a',
        },
        background: '#f5f5f5',
        chip: '#e74c3c',
        tool: '#27ae60',
        industry: '#3498db',
        academic: '#9b59b6',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        display: ['Noto Sans SC', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

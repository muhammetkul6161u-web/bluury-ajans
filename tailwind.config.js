/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        dark: '#0D0D0D',
        'dark-card': '#141414',
        'dark-border': 'rgba(255,255,255,0.06)',
        gold: '#C8A45A',
        'gold-dark': '#B8943D',
        'gold-light': '#D4B76A',
        silver: '#C0C0C0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"Playfair Display"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "scroll": "scroll 30s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
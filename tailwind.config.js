/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: 'rgb(26, 11, 84)',
          lavender: 'rgb(169, 151, 206)',
          purple: 'rgb(200, 111, 255)',
          blue: 'rgb(28, 78, 255)',
        }
      },
      backgroundImage: {
        'gradient-a': 'linear-gradient(90deg, rgb(28,78,255), rgb(172,36,255) 50%, rgb(254,136,27))',
        'gradient-b': 'linear-gradient(90deg, rgb(43,167,255), rgb(202,69,255) 50%, rgb(254,136,27))',
      }
    },
  },
  plugins: [],
}

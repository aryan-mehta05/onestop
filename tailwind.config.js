/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["'Playfair Display'", "serif"],
      },
      colors: {
        'os-sky': '#caf0f8',        // 1) #caf0f8
        'os-lightblue': '#90e0ef',  // 2) #90e0ef
        'os-blue': '#00b4d8',       // 3) #00b4d8
        'os-deepblue': '#0077b6',   // 4) #0077b6
        'os-darkblue': '#0d3b66',   // 5) #0d3b66
        'os-yellow': '#ffb703',     // 6) #ffb703
        'os-orange': '#fb8500',     // 7) #fb8500
        'os-red': '#c1121f',        // 8) #c1121f
        'os-darkred': '#780000',    // 9) #780000
      },
    },
  },
  plugins: [],
}


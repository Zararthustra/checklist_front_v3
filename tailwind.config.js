/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      title: "Oswald, ui-serif",
      //   sans: ['Graphik', 'sans-serif'],
      //   serif: ['Merriweather', 'serif'],
    },
    screens: {
      // From XXX => @media (min-width: XXXpx) { ... }
      fsm: "640px",
      fmd: "768px",
      flg: "1024px",
      fxl: "1280px",
      f2xl: "1536px",
      // To XXX => @media (max-width: XXX-1px) { ... }
      tsm: { max: "639px" },
      tmd: { max: "767px" },
      tlg: { max: "1023px" },
      txl: { max: "1279px" },
      t2xl: { max: "1535px" },
    },
    extend: {
      animation: {
        spin: "spin 0.7s linear infinite"
      },
      height: {
        screen: ["100vh", "100dvh"],
      },
      colors: {
        primary: {
          50: "#f6faf3",
          100: "#e9f5e3",
          200: "#d3eac8",
          300: "#afd89d",
          400: "#82bd69",
          500: "#61a146",
          600: "#4c8435",
          700: "#3d692c",
          800: "#345427",
          900: "#2b4522",
          950: "#13250e",
        },
      },
    },
  },
  plugins: [],
};

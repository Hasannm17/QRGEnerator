/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {  colors: {
      primary: "#3D4048",
      secondary: "#9105FE",
      tertiary: "#151030",
      
    },
    boxShadow: {
      card: "0px 35px 120px -15px #211e35",
    },
    screens: {
      xs: "450px",
      xxl:"1500px",
    },},
  },
  plugins: [],
}

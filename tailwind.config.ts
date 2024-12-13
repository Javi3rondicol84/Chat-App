/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",   // Incluir la carpeta pages
    "./src/app/components/**/*.{js,ts,jsx,tsx}",  // Incluir la carpeta components dentro de src
    "./src/globals.css",  // Incluir el archivo globals.css dentro de src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

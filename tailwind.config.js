// Configuración de Tailwind. Para regenerar tailwind.css después de cambiar clases:
//   npx tailwindcss@3.4.17 -c tailwind.config.js -i tailwind.input.css -o tailwind.css --minify
module.exports = {
  content: ['./index.html', './app.js'],
  theme: {
    extend: {
      colors: {
        stone: { 50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 800: '#292524', 900: '#1c1917' },
        emerald: { 50: '#ecfdf5', 100: '#d1fae5', 600: '#059669', 700: '#047857' },
        slate: { 600: '#475569', 700: '#334155', 800: '#1e293b' }
      },
      fontFamily: { sans: ['Inter', 'sans-serif'], mono: ['Roboto Mono', 'monospace'] },
    }
  }
}

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  content: [
    "./index.html",
    "./src/**/*.jsx"
  ],
  darkMode: 'class',
  theme : {
    extend: {},
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(), // Habilita la importación de SVGs como componentes de React
  ],
  server: {
    watch: {
      usePolling: true
    }
  }
})
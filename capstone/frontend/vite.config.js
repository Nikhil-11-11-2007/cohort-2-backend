import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      // Backend API
      '/api': {
        target: 'http://127.0.0.1',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // Allow iframes from nip.io sandbox preview domains
  preview: {
    headers: {
      'Content-Security-Policy': "frame-src *;",
    },
  },
})

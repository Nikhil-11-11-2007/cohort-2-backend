import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    cors: {
      origin: /^https?:\/\/(?:.+\.)?localhost(?::\d+)?$/,
    },
    proxy: {
      // Backend API
      '/api': {
        target: 'http://localhost/',
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

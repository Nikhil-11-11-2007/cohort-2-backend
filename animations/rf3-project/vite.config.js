import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: "autoUpdate",
    manifest: {
      name: "offline-fan gallery",
      short_name: "fan-gallery",
      description: "this is 3D fan gallery",
      theme_color: "#111",
      background_color: "#111",
      icons: [
        {
          src: "image1.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "image2.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    },
  }),
  ],
});

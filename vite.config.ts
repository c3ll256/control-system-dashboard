import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Font from 'vite-plugin-font'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Font.vite()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/socket.io': {
        target: 'ws://localhost:8765',
        ws: true,
      },
      '/api': {
        target: 'http://192.168.124.12:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

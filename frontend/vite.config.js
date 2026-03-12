import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://192.168.1.5:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  },
  preview: {
    allowedHosts: ['foxstories-frontend.onrender.com', 'localhost', '192.168.1.5'],
    host: '0.0.0.0',
    port: 5000
  }
})

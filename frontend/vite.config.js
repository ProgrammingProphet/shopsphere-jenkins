import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 3000,
    proxy: {
      '/api/users': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
      },
      '/api/products': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        secure: false,
      },
      '/api/categories': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        secure: false,
      },
      '/api/inventory': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        secure: false,
      },
      '/api/orders': {
        target: 'http://localhost:8083',
        changeOrigin: true,
        secure: false,
      },
      '/api/payments': {
        target: 'http://localhost:8083',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

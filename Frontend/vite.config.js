import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: './', // 👈 important for relative path resolution when served from backend
  build: {
    outDir: 'dist', // ensure this matches Express static path
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        }
      }
    }
  },
  server: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'https://momentum-s326.onrender.com', // 'http://localhost:3000'
        changeOrigin: true,
        secure: false
      }
    }
  }
});

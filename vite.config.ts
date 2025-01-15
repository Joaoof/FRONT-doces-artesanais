import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: './index.html', // Caminho para o arquivo index.html
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});


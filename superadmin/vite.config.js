import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Super Admin Master Panel (Port 3001)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});

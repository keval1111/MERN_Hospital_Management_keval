import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Patient & Public User Frontend (Port 3000)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});

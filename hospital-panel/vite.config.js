import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Hospital Operations Panel: Admin, Doctor, Staff (Port 3002)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});

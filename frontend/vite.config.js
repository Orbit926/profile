import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 600, // opcional

    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          mui: [
            '@mui/material',
            '@mui/system',
            '@emotion/react',
            '@emotion/styled',
          ],
          motion: ['framer-motion'],
          recaptcha: ['react-google-recaptcha-v3'],
        }
      }
    }
  }
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, isSsrBuild }) => ({
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 600,
    target: 'es2015',

    // En el build de cliente generamos el SSR manifest para que
    // prerender.js sepa qué assets inyectar
    ...(isSsrBuild
      ? {}
      : { ssrManifest: true }),

    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: {
              react: ['react', 'react-dom'],
              mui: [
                '@mui/material',
                '@mui/system',
                '@emotion/react',
                '@emotion/styled',
              ],
              'mui-icons': ['@mui/icons-material'],
              motion: ['framer-motion'],
              three: ['three'],
              i18n: ['i18next', 'react-i18next'],
              recaptcha: ['react-google-recaptcha-v3'],
            },
          },
        },
  },
}));

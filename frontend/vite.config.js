import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false,
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('react-markdown') || id.includes('remark-gfm')) {
            return 'markdown';
          }

          if (id.includes('socket.io-client')) {
            return 'socket';
          }

          if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
            return 'state';
          }

          if (id.includes('lucide-react')) {
            return 'icons';
          }

          if (id.includes('react')) {
            return 'react-vendor';
          }

          return 'vendor';
        },
      },
    },
  },
});

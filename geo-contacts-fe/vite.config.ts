import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@popperjs/core': 'popper.js/dist/esm/popper.js',
      'bootstrap/dist/js/bootstrap.bundle': 'bootstrap/dist/js/bootstrap.bundle.min.js',
      'bootstrap/dist/css/bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css',
    },
  },
});

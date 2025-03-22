import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { Buffer } from 'buffer';

// Polyfill Buffer for the browser
globalThis.Buffer = Buffer;

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    'process.env': {},
    'global': {},
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      buffer: 'buffer',
    },
  },
  server: {
    proxy: {
      '/auth/v1': {
        target: 'https://cfbkroydnewghbokycek.supabase.co',
        changeOrigin: true,
      }
    }
  }
});
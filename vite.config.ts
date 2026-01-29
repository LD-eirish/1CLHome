import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@infrastructure': path.resolve(__dirname, './src/infrastructure'),
      '@data': path.resolve(__dirname, './src/data'),
      '@business': path.resolve(__dirname, './src/business'),
      '@presentation': path.resolve(__dirname, './src/presentation'),
      '@application': path.resolve(__dirname, './src/application')
    }
  },
  server: {
    port: 3000,
    open: true
  },
    base: '/1CLHome/',
    build: {
    outDir: 'dist',
    sourcemap: true
  }
});

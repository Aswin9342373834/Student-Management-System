import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Plugin to generate 404.html from index.html for SPA routing on GitHub Pages
const spa404Plugin = () => ({
  name: 'spa-404-fallback',
  closeBundle() {
    const distDir = path.resolve(__dirname, 'dist');
    const indexPath = path.join(distDir, 'index.html');
    const fallbackPath = path.join(distDir, '404.html');
    if (fs.existsSync(indexPath)) {
      fs.copyFileSync(indexPath, fallbackPath);
    }
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), spa404Plugin()],
  base: '/Student-Management-System/',
  server: {
    port: 3000,
    open: false
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          icons: ['lucide-react']
        }
      }
    }
  }
});

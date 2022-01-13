import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    fs: {
      allow: ['.'],
    },
  },
  plugins: [solidPlugin()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  }
});

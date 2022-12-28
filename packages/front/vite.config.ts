import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import { terser } from 'rollup-plugin-terser';
// @ts-ignore
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@store': path.resolve(__dirname, './src/store/store.ts'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@library': path.resolve(__dirname, './src/modules/library'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3005',
        changeOrigin: true,
        secure: false,
        ws: true,
        proxyTimeout: 0,
        timeout: 0,
      },
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'a/[name].[ext]',
        chunkFileNames: '[name].js',
      },
      plugins: [
        terser({
          compress: {
            defaults: true,
            drop_console: true,
          },
          mangle: {
            eval: true,
            module: true,
            toplevel: true,
            safari10: true,
            properties: false,
          },
          output: {
            comments: false,
          },
        }),
      ],
    },
  },
});

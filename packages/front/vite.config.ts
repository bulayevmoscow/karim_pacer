import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-ignore
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
    cssCodeSplit: false,
  },
})

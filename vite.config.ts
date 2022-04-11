import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import styleImport, { VantResolve } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
    
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  base: './',
  server: {
    host: '0.0.0.0',
    port: 3001,
    open: false,
    cors: true, // 允许跨域
    proxy: {
      '/api': {
        // target: 'http://localhost:9090/',
        target: 'http://119.29.134.117:9090/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/api', '')
      }
    }
  }
})

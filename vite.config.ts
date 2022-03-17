import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  base: './', // 打包路径
  server: {
    host: '0.0.0.0',
    port: 3001,
    open: false,
    cors: true, // 允许跨域
    proxy: {
      '/api': {
        target: 'http://localhost:9090/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/api', '')
      }
    }
  }
})

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles:['./src/testSetup.tsx'],
    globals: true,
    environment: 'jsdom',
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:8094', // 로컬 백엔드 주소
        changeOrigin: true,
        secure: false,
      },
    },
  },

})


const copyRedirects = () => {
  return {
    name: 'copy-redirects',
    closeBundle() {
      copyFileSync(resolve(__dirname, 'public/_redirects'), resolve(__dirname, 'dist/_redirects'));
    }
  }
  
}

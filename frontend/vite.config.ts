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
    port: 3000,
  },

})

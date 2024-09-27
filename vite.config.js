import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': resolve(__dirname, 'src/assets'),
      '@scss': resolve(__dirname, 'src/scss'),
      '@utils': resolve(__dirname, 'src/components/utils'),
    },
  },
})

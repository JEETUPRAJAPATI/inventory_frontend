import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Add server configuration to prevent timeout issues
    hmr: {
      timeout: 5000
    }
  }
})
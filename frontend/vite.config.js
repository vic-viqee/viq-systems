import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'

const rootDir = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        services: resolve(rootDir, 'services.html'),
        work: resolve(rootDir, 'work.html'),
        about: resolve(rootDir, 'about.html'),
        contact: resolve(rootDir, 'contact.html'),
      },
    },
  },
})

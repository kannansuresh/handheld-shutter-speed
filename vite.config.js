import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import process from 'process'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    publicPath: process.env.NODE_ENV === "production" ? "/handheld-shutter-speed/" : "/",
  },
  base: process.env.NODE_ENV === "production" ? "/handheld-shutter-speed/" : "/"
})
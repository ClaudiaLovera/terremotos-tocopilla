import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/terremotos-tocopilla/',
  plugins: [react()],
})

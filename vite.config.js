import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  base: '/testreact2/'   // <-- IMPORTANTISSIMO: nome del repo
})
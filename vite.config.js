import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  base: '/testreact/'   // <-- IMPORTANTISSIMO: nome del repo
})
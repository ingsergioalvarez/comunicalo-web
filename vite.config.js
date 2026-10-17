import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  server: { port: 5173 },
  build: {
    target: 'es2019',
    // Los documentos (PDF/MP3) de /public solo se copian en el build del cliente
    copyPublicDir: !isSsrBuild,
  },
  ssr: {
    noExternal: ['lucide-react'],
  },
}));

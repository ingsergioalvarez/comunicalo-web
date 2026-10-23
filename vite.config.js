import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  server: {
    port: 5173,
    // En desarrollo los formularios guardan en la base real a través de la copia de prueba de lead.php
    proxy: {
      '/api/lead.php': {
        target: 'https://comunicalo.mx', changeOrigin: true, secure: true,
        rewrite: () => '/api-prueba/lead.php',
      },
    },
  },
  build: {
    target: 'es2019',
    // Los documentos (PDF/MP3) de /public solo se copian en el build del cliente
    copyPublicDir: !isSsrBuild,
    // El prerender lo usa para precargar el JS de cada página; se borra al terminar
    manifest: !isSsrBuild,
    rollupOptions: isSsrBuild ? {} : {
      output: {
        // Todos los iconos en un solo archivo, en lugar de un archivo pequeño por icono
        manualChunks: (id) => (id.includes('lucide-react') ? 'iconos' : undefined),
      },
    },
  },
  ssr: {
    noExternal: ['lucide-react'],
  },
}));

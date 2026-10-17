# Comunícalo de México: sitio web v2

Sitio comercial de comunicalo.mx: React + Vite con **prerender** (cada página se entrega como HTML real para Google) y URLs limpias (`/empresas`, `/hogar`...).

## Comandos

```bash
npm install        # una vez
npm run dev        # desarrollo en http://localhost:5173
npm run build      # genera /dist listo para subir al servidor
npm run preview    # revisa /dist como en producción: http://127.0.0.1:4280
```

## Dónde se edita el contenido (sin tocar diseño)

| Qué | Archivo |
| --- | --- |
| Teléfonos, correo, dirección, WhatsApp, portal de pagos | `src/data/site.js` |
| Planes de hogar y precios (registro IFT) | `src/data/planes.js` |
| Servicios para empresas | `src/data/servicios.js` |
| Franja de promociones, cobertura, pasos, preguntas frecuentes | `src/data/comercial.js` |
| MAXVISION (paquetes; `MOSTRAR_PRECIOS`) | `src/data/maxvision.js` |
| Documentos IFT/PROFECO y adjuntos | `src/data/documentos.js` (índice, `doc()`) + archivos en `public/docs/` |
| Títulos y descripciones para Google | `src/routes.js` |

Cambia el dato, ejecuta `npm run build` y sube la carpeta `dist/`.

## Publicación

- **nginx**: usa `deploy/nginx.conf` (incluye redirecciones 301 de las URLs antiguas `index.php?accion=...`).
- **Apache/cPanel**: el archivo `.htaccess` ya va dentro de `dist/`.

## Adjuntos (PDF y audios)

Los adjuntos **no se guardan en git** (`public/docs/` está en `.gitignore`; pesa ~217 MB por los audios).

- Todo enlace a un adjunto pasa por `doc('ruta/archivo.pdf')` de `src/data/documentos.js`. Nunca escribas `/docs/...` a mano.
- Para agregar uno: copia el archivo a `public/docs/` y úsalo con `doc('...')`.
- `npm run docs:check` compara el código contra la carpeta: avisa de archivos faltantes (404) o sin usar.
- **Publicación**: sube la carpeta `public/docs/` una sola vez al servidor como `/docs/`, y luego solo los archivos nuevos. `npm run build` también la copia a `dist/docs/` si la tienes en local.
- Para servirlos desde otro dominio o CDN, compila con `VITE_DOCS_URL=https://cdn.ejemplo.com/docs npm run build`.

## Origen de los datos

- Tarifas: "Formatos de información simplificada" registrados ante el IFT, recuperados del sitio anterior (`public/docs/tarifas`).
- Documentos legales y audios: recuperados del sitio anterior (que hoy es una copia de Wayback Machine de 2021–2023).

/**
 * prerender.js — Script de pre-renderizado SSG
 *
 * Flujo:
 * 1. `vite build` genera dist/client (bundle del browser) y dist/.vite/ssr-manifest.json
 * 2. `vite build --ssr src/entry-server.jsx` genera dist/server/entry-server.js
 * 3. Este script importa el bundle de servidor, llama a render(), e inyecta
 *    el HTML resultante en dist/client/index.html reemplazando <!--ssr-outlet-->
 *
 * El resultado es un index.html estático con contenido real que los crawlers
 * de Google/LinkedIn/etc. pueden leer sin ejecutar JavaScript.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function prerender() {
  const toAbsolute = (p) => path.resolve(__dirname, p);

  // Leer el index.html del build de cliente
  const templatePath = toAbsolute('dist/index.html');
  if (!fs.existsSync(templatePath)) {
    console.error(
      '❌  No se encontró dist/index.html. ¿Corriste `vite build` primero?'
    );
    process.exit(1);
  }
  let template = fs.readFileSync(templatePath, 'utf-8');

  // Importar el bundle de servidor generado por `vite build --ssr`
  const serverEntryPath = toAbsolute('dist-server/entry-server.js');
  if (!fs.existsSync(serverEntryPath)) {
    console.error(
      '❌  No se encontró dist-server/entry-server.js. ¿Corriste `vite build --ssr src/entry-server.jsx`?'
    );
    process.exit(1);
  }

  const { render } = await import(serverEntryPath);

  // Renderizar la app a HTML
  console.log('⚙️   Renderizando la app en el servidor...');
  const { html: appHtml } = render();

  // Reemplazar el placeholder con el HTML renderizado
  const finalHtml = template.replace('<!--ssr-outlet-->', appHtml);

  // Sobrescribir dist/index.html con la versión pre-renderizada
  fs.writeFileSync(templatePath, finalHtml, 'utf-8');

  console.log('✅  Pre-renderizado completo → dist/index.html');
  console.log(
    `    HTML inyectado: ${(appHtml.length / 1024).toFixed(1)} KB de contenido visible para crawlers`
  );
}

prerender().catch((err) => {
  console.error('❌  Error durante el pre-renderizado:', err);
  process.exit(1);
});

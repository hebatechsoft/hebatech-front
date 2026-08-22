// Snapshot de post-build: levanta dist/ en un server estatico local,
// renderiza "/" con Chromium headless y pisa dist/index.html con el HTML
// resultante. El shell (<script type="module">, <link rel="stylesheet">)
// se conserva porque sale de document.documentElement.outerHTML tal cual
// quedo despues de que React monto — asi un usuario real sigue recibiendo
// la app interactiva de siempre, y un crawler que no ejecuta JS (o un bot
// de preview de WhatsApp/LinkedIn/Slack) ve el contenido real, no un
// <div id="root"></div> vacio.
//
// prefers-reduced-motion se emula en 'reduce' antes de navegar: eso apaga
// el Loader (se desmonta solo) y hace que useReveal marque todo `is-in` de
// una, asi el snapshot captura el contenido ya visible y no el estado
// opacity:0 previo a las animaciones de entrada.

import { createServer } from 'node:http';
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import puppeteer from 'puppeteer';

const DIST = join(process.cwd(), 'dist');
const PORT = 4321;

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

function serveStatic() {
  return createServer((req, res) => {
    const urlPath = (req.url ?? '/').split('?')[0];
    let filePath = join(DIST, urlPath === '/' ? 'index.html' : urlPath);
    try {
      if (statSync(filePath).isDirectory()) filePath = join(filePath, 'index.html');
    } catch {
      filePath = join(DIST, 'index.html'); // fallback SPA, mismo criterio que vercel.json
    }
    try {
      const data = readFileSync(filePath);
      res.setHeader('Content-Type', MIME[extname(filePath)] ?? 'application/octet-stream');
      res.end(data);
    } catch {
      res.statusCode = 404;
      res.end('not found');
    }
  });
}

const server = serveStatic();
await new Promise((resolve) => server.listen(PORT, resolve));

let browser;
try {
  browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0', timeout: 30_000 });
  await page.waitForSelector('footer', { timeout: 10_000 });

  const html = await page.evaluate(() => '<!doctype html>\n' + document.documentElement.outerHTML);
  writeFileSync(join(DIST, 'index.html'), html);

  console.log('[prerender] dist/index.html reescrito con el contenido real (antes: <div id="root"></div> vacio).');
} finally {
  await browser?.close();
  server.close();
}

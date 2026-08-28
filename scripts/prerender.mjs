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
import { readFileSync, writeFileSync, statSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

const DIST = join(process.cwd(), 'dist');
const PORT = 4321;

// Una entrada por idioma. `/` es español y `/en` inglés; el servidor
// estatico de abajo cae al index.html de siempre para cualquier ruta que no
// exista como archivo, igual que hace Vercel.
const ROUTES = [
  { route: '/', out: 'index.html' },
  { route: '/en', out: 'en/index.html' },
];

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

// El binario de @sparticuz/chromium viene compilado para el sandbox de
// build de Vercel (Amazon Linux), no corre en Windows/Mac. Fuera de Vercel
// el build sigue sirviendo, solo que sin el snapshot (dist/index.html
// queda con el <div id="root"></div> vacio de siempre).
if (!process.env.VERCEL) {
  console.log('[prerender] fuera de Vercel: se salta el snapshot (el chromium empaquetado es solo para Linux).');
  process.exit(0);
}

const server = serveStatic();
await new Promise((resolve) => server.listen(PORT, resolve));

let browser;
try {
  browser = await puppeteer.launch({
    executablePath: await chromium.executablePath(),
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
  });
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);

  // Un snapshot POR IDIOMA. El idioma sale de la ruta y el <head> lo
  // sincroniza React al montar, asi que cada captura queda con su propio
  // lang, title, description y canonical ya resueltos. Un solo snapshot
  // dejaria /en sirviendo el HTML en espanol a los rastreadores.
  for (const { route, out } of ROUTES) {
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30_000 });
    await page.waitForSelector('footer', { timeout: 10_000 });

    const html = await page.evaluate(() => '<!doctype html>\n' + document.documentElement.outerHTML);
    const target = join(DIST, out);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, html);
    console.log(`[prerender] ${out} <- ${route}`);
  }
} finally {
  await browser?.close();
  server.close();
}

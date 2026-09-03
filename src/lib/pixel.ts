/**
 * Meta Pixel.
 *
 * El snippet oficial de Meta va inline en el <head>. Aca vive en un modulo
 * por dos razones concretas de este proyecto:
 *
 *   prerender  `scripts/prerender.mjs` fotografia el sitio con Chromium
 *              headless durante el build. Con el snippet en el HTML, cada
 *              deploy dispararia un PageView falso desde el servidor de
 *              build de Vercel, y el `waitUntil: networkidle0` se quedaria
 *              esperando a connect.facebook.net.
 *   local      `npm run dev` y los preview deploys no deberian ensuciar la
 *              medicion con eventos que no son de usuarios reales.
 *
 * Por eso el pixel solo arranca en los dominios de produccion
 * (`TRACKED_HOSTS`). En cualquier otro host `initPixel()` no carga nada y
 * `track()` queda en no-op, sin romper nada de la pagina.
 *
 * El <noscript> con el pixel de imagen si vive en `index.html`: solo lo pide
 * un navegador sin JS, asi que ni el prerender ni el dev server lo tocan.
 */

type PixelParams = Record<string, unknown>;

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: unknown;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** El ID se puede pisar con VITE_META_PIXEL_ID sin tocar el codigo. */
const PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined) ?? '1056888247058854';

/** Unicos hosts que reportan. Si algun dia cambia el dominio, va aca. */
const TRACKED_HOSTS = ['hebatech.cloud', 'www.hebatech.cloud'];

const isTrackedHost = () => TRACKED_HOSTS.includes(window.location.hostname);

/**
 * Traduccion 1:1 del bootstrap oficial: deja `window.fbq` encolando llamadas
 * y carga `fbevents.js` aparte, para que un evento disparado antes de que el
 * script termine de bajar no se pierda.
 */
function loadFbevents() {
  if (window.fbq) return;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];

  window.fbq = fbq;
  window._fbq ??= fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);
}

/** Arranca el pixel y reporta la primera vista. Se llama una sola vez. */
export function initPixel() {
  if (!isTrackedHost()) return;
  loadFbevents();
  window.fbq?.('init', PIXEL_ID);
  window.fbq?.('track', 'PageView');
}

/** Evento estandar de Meta (Lead, Contact, ...). No-op si el pixel no cargo. */
export function track(event: string, params?: PixelParams) {
  window.fbq?.('track', event, params);
}

/** Atajo del evento mas repetido: cada canal directo de contacto. */
export function trackContact(method: 'whatsapp' | 'email') {
  track('Contact', { method });
}

/**
 * onClick listo para un enlace de contacto, o undefined si ese enlace no lo
 * es. Existe para que los enlaces que salen de un .map() no tengan que
 * repetir el ternario en cada atributo.
 */
export function onContactClick(method?: 'whatsapp' | 'email') {
  return method ? () => trackContact(method) : undefined;
}

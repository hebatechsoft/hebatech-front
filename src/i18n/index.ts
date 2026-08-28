import { createContext, useContext, useEffect } from 'react';
import { es, type Dictionary, type Split } from './es';
import { en } from './en';

export type Lang = 'es' | 'en';

export const SITE_URL = 'https://www.hebatech.cloud';
const DICTIONARIES: Record<Lang, Dictionary> = { es, en };

/**
 * El idioma sale de la URL, no de un estado en memoria.
 *
 * Un selector que solo cambia el estado de React deja las dos versiones en
 * la misma direccion: Google indexa una sola, y nadie puede compartir el
 * enlace en inglés. Con `/` y `/en` cada idioma tiene su URL propia,
 * rastreable y compartible.
 */
export function langFromPath(pathname: string): Lang {
  return /^\/en(\/|$)/.test(pathname) ? 'en' : 'es';
}

/** Ruta equivalente en el otro idioma, conservando el ancla si la hay. */
export function pathForLang(lang: Lang, hash = ''): string {
  return (lang === 'en' ? '/en' : '/') + hash;
}

type Ctx = { lang: Lang; t: Dictionary };
export const LangContext = createContext<Ctx>({ lang: 'es', t: es });

/**
 * Sincroniza el <head> con el idioma activo.
 *
 * Importa que esto corra en el cliente: el prerender fotografia el HTML
 * DESPUES de que React monta, asi que el snapshot de cada idioma sale con
 * su lang, su title y su canonical ya correctos.
 */
export function useDocumentHead(lang: Lang, t: Dictionary) {
  useEffect(() => {
    const html = document.documentElement;
    html.lang = t.meta.htmlLang;
    document.title = t.meta.title;

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.head.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    const url = SITE_URL + (lang === 'en' ? '/en' : '/');
    setMeta('meta[name="description"]', 'content', t.meta.description);
    setMeta('meta[property="og:description"]', 'content', t.meta.description);
    setMeta('meta[name="twitter:description"]', 'content', t.meta.description);
    setMeta('meta[property="og:title"]', 'content', t.meta.title);
    setMeta('meta[name="twitter:title"]', 'content', t.meta.title);
    setMeta('meta[property="og:locale"]', 'content', t.meta.ogLocale);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('link[rel="canonical"]', 'href', url);
  }, [lang, t]);
}

/** Diccionario del idioma activo. */
export function useT(): Dictionary {
  return useContext(LangContext).t;
}

/** Idioma activo, para los pocos casos que necesitan decidir por idioma. */
export function useLang(): Lang {
  return useContext(LangContext).lang;
}

export type { Dictionary, Split };
export { DICTIONARIES };

import type { ReactNode } from 'react';
import { DICTIONARIES, LangContext, langFromPath, useDocumentHead } from './index';

/**
 * Unico componente del modulo de idioma. Vive aparte del resto de la API
 * (contexto, hooks, utilidades) porque un archivo que exporta componentes y
 * funciones a la vez rompe Fast Refresh en desarrollo.
 */
export function LangProvider({ children }: { children: ReactNode }) {
  const lang = langFromPath(window.location.pathname);
  const t = DICTIONARIES[lang];
  useDocumentHead(lang, t);
  return <LangContext.Provider value={{ lang, t }}>{children}</LangContext.Provider>;
}

export default LangProvider;

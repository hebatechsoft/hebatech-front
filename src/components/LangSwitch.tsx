import { pathForLang, useLang, useT } from '../i18n';
import './LangSwitch.css';

/**
 * Selector de idioma.
 *
 * Es un enlace real, no un boton con estado: cada idioma vive en su propia
 * URL (`/` y `/en`), asi que cambiar de idioma es navegar. Eso lo hace
 * compartible, indexable, y funciona con clic derecho o abrir en pestaña
 * nueva como cualquier enlace.
 *
 * `hrefLang` le dice al navegador y a los rastreadores a que idioma lleva.
 */
const LangSwitch = ({ className = '' }: { className?: string }) => {
  const lang = useLang();
  const t = useT();
  const other = lang === 'es' ? 'en' : 'es';

  return (
    <a
      className={`lang ${className}`.trim()}
      href={pathForLang(other)}
      hrefLang={other}
      aria-label={t.meta.switchTo}
      title={t.meta.switchTo}
    >
      <span className={lang === 'es' ? 'is-on' : undefined}>ES</span>
      <span className="lang__sep" aria-hidden="true" />
      <span className={lang === 'en' ? 'is-on' : undefined}>EN</span>
    </a>
  );
};

export default LangSwitch;

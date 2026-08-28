import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import { useT } from '../i18n';
import './Loader.css';

/** Tope duro: la intro nunca bloquea mas que esto, cargue lo que cargue. */
const MAX_MS = 2200;
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
/** Una vez por sesion: navegar entre anclas o volver atras no repite la cortina. */
const SEEN_KEY = 'heba-loader-seen';

/**
 * Cortina de entrada.
 *
 * El contador sigue la carga REAL de la pagina, no un temporizador
 * decorativo: avanza con el progreso hasta que `window.load` dispara, y ahi
 * completa. Un porcentaje inventado es la misma clase de mentira que un
 * "98% de satisfaccion".
 *
 * Con prefers-reduced-motion no se monta. Tampoco se vuelve a montar en la
 * misma sesion de pestaña: ya cumplio su proposito la primera vez.
 */
const Loader = () => {
  const alreadySeen = () => {
    try {
      return sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {
      return false;
    }
  };

  const t = useT();
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(() => window.matchMedia(REDUCED_MOTION).matches || alreadySeen());
  const loaded = useRef(false);

  useEffect(() => {
    if (gone) {
      document.documentElement.classList.add('is-ready');
      return;
    }

    document.body.style.overflow = 'hidden';
    const start = performance.now();

    const finish = () => {
      loaded.current = true;
    };
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });

    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      // sube rapido al principio y se frena cerca del final hasta que
      // termina la carga: el avance refleja algo, no rellena tiempo
      const ceiling = loaded.current ? 1 : 0.92;
      const eased = Math.min(ceiling, 1 - Math.pow(1 - elapsed / MAX_MS, 2.2));
      setPct(Math.round(eased * 100));

      if ((loaded.current && eased >= 0.999) || elapsed >= MAX_MS) {
        setPct(100);
        setDone(true);
        document.body.style.overflow = '';
        document.documentElement.classList.add('is-ready');
        try {
          sessionStorage.setItem(SEEN_KEY, '1');
        } catch {
          /* Safari en modo privado tira aca: sin sessionStorage, la cortina
             se repite en cada carga, pero el sitio sigue andando igual. */
        }
        window.setTimeout(() => setGone(true), 1200);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', finish);
      document.body.style.overflow = '';
    };
  }, [gone]);

  if (gone) return null;

  return (
    <div className={`ldr ${done ? 'is-done' : ''}`}>
      <div className="ldr__win vib">
        <div className="ldr__in">
          <Logo size={22} />
          <div className="ldr__bar">
            <b style={{ transform: `scaleX(${pct / 100})` }} />
          </div>
          <div className="ldr__row">
            <span>{t.loader.label}</span>
            <span className="ldr__pct">{String(pct).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

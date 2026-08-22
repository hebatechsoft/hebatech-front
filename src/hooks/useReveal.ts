import { useEffect } from 'react';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/**
 * Enciende la clase `is-in` en cada `.rv` y `[data-split]` cuando entra en
 * pantalla, y deja de observarlo.
 *
 * Usa IntersectionObserver a proposito. Un listener de `scroll` corre en
 * cada frame, no se agrupa y provoca tirones; el observer lo resuelve el
 * navegador fuera del hilo principal.
 *
 * Con `prefers-reduced-motion` no observa nada: marca todo visible de una.
 */
export function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.rv, [data-split]');
    if (!targets.length) return;

    if (window.matchMedia(REDUCED_MOTION).matches) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

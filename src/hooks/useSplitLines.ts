import { useEffect } from 'react';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const LINE_STAGGER_MS = 110;

/**
 * Revelado por linea para cualquier titular con `data-split`.
 *
 * Envuelve palabra por palabra, mide donde corta la linea DE VERDAD y
 * recien ahi arma la mascara. No se puede hacer con `<br>` fijos: el corte
 * depende del ancho, de la fuente cargada y del tamano de pantalla.
 *
 * Se rehace al cambiar el ancho de ventana y espera a `document.fonts.ready`,
 * porque medir antes de que cargue la tipografia da cortes equivocados.
 *
 * Con `prefers-reduced-motion` no hace nada: el titular queda como HTML plano.
 */
export function useSplitLines() {
  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION).matches) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-split]'));
    if (!targets.length) return;

    // se guarda el HTML original: cada recalculo parte de cero
    const original = new WeakMap<HTMLElement, string>();
    targets.forEach((el) => original.set(el, el.innerHTML));

    const wrapWords = (node: Node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          (child.textContent ?? '').split(/(\s+)/).forEach((token) => {
            if (!token) return;
            if (/^\s+$/.test(token)) {
              frag.appendChild(document.createTextNode(token));
              return;
            }
            const word = document.createElement('span');
            word.className = 'w';
            word.textContent = token;
            frag.appendChild(word);
          });
          (child as ChildNode).replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          wrapWords(child);
          // .hand y demas inline se tratan como una palabra mas
          (child as HTMLElement).classList.add('w');
        }
      });
    };

    const split = (el: HTMLElement) => {
      el.innerHTML = original.get(el) ?? el.innerHTML;
      wrapWords(el);

      const words = Array.from(el.querySelectorAll<HTMLElement>('.w'));
      if (!words.length) return;

      // agrupa por altura real: asi el corte respeta el que hizo el navegador
      const lines: HTMLElement[][] = [];
      let lastTop: number | null = null;
      words.forEach((word) => {
        const top = Math.round(word.offsetTop);
        if (lastTop === null || Math.abs(top - lastTop) > 4) {
          lines.push([]);
          lastTop = top;
        }
        lines[lines.length - 1].push(word);
      });

      const out = document.createDocumentFragment();
      lines.forEach((line, i) => {
        const mask = document.createElement('span');
        mask.className = 'ln';
        const inner = document.createElement('span');
        inner.style.setProperty('--d', `${i * LINE_STAGGER_MS}ms`);
        line.forEach((word, j) => {
          if (j) inner.appendChild(document.createTextNode(' '));
          inner.appendChild(word);
        });
        mask.appendChild(inner);
        out.appendChild(mask);
      });

      el.innerHTML = '';
      el.appendChild(out);
      el.classList.add('split');
    };

    const runAll = () => {
      targets.forEach((el) => {
        const wasVisible = el.classList.contains('is-in');
        split(el);
        if (wasVisible) el.classList.add('is-in');
      });
    };

    runAll();
    document.fonts?.ready.then(runAll);

    let timer: number;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(runAll, 220);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, []);
}

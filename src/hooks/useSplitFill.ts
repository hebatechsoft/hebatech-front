import { useEffect, type RefObject } from 'react';

/**
 * Alinea el relleno fotografico de las letras caladas con la foto de fondo.
 *
 * Las letras del hero son texto transparente relleno con la misma imagen
 * (`background-clip: text`). Para que el relleno calce al pixel hay que
 * replicar en CSS lo que `object-fit: cover` hace en la imagen: calcular la
 * escala de cobertura y desplazar el fondo segun donde cae cada linea.
 *
 * Se usa offsetLeft/offsetTop y no getBoundingClientRect porque los offsets
 * ignoran el `transform` del revelado y dan la posicion DE REPOSO, que es la
 * que hay que alinear.
 *
 * Las medidas salen de naturalWidth/naturalHeight de la imagen real: con
 * constantes escritas a mano, cambiar la foto desalineaba el calado en
 * silencio y habia que acordarse de tocar tres lugares.
 */
export function useSplitFill(
  heroRef: RefObject<HTMLElement | null>,
  imgRef: RefObject<HTMLImageElement | null>
) {
  useEffect(() => {
    const hero = heroRef.current;
    const img = imgRef.current;
    if (!hero || !img) return;

    const sync = () => {
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;

      const hw = hero.offsetWidth;
      const hh = hero.offsetHeight;
      const scale = Math.max(hw / iw, hh / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const ox = (hw - dw) / 2;
      const oy = (hh - dh) / 2;

      hero.querySelectorAll<HTMLElement>('.hero__cut .ln > span').forEach((line) => {
        let x = 0;
        let y = 0;
        let node: HTMLElement | null = line;
        while (node && node !== hero) {
          x += node.offsetLeft;
          y += node.offsetTop;
          node = node.offsetParent as HTMLElement | null;
        }
        // tres capas de fondo: solo la del medio (la foto) se posiciona
        line.style.backgroundSize = `auto, ${dw}px ${dh}px, auto`;
        line.style.backgroundPosition = `0 0, ${ox - x}px ${oy - y}px, 0 0`;
      });
    };

    sync();
    if (img.complete) sync();
    else img.addEventListener('load', sync, { once: true });

    document.fonts?.ready.then(sync);
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [heroRef, imgRef]);
}

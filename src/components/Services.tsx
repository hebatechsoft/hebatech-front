import { useEffect, useRef } from 'react';
import { useT } from '../i18n';
import './Services.css';

/**
 * `peek`: material propio, no stock. Antes eran tres fotos hotlinkeadas
 * desde rawpixel.com (fuera de nuestro control, sin relacion con el trabajo
 * real). Reusan las mismas fotos que ya estan en `/public` — la del hero, la
 * del proceso en Enfoque y una captura real de Rave.
 */
/** Solo las imagenes: el texto vive en el diccionario de idioma. */
const PEEKS = ['/hero.webp', '/rave.webp', '/enfoque.webp'];

const FINE_POINTER = '(hover: hover) and (min-width: 901px)';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/**
 * Servicios. Lista editorial, sin tarjetas: cuando el contenido alcanza, la
 * caja sobra. Son tres a proposito, no seis: seis opciones no comunican
 * amplitud, comunican que no se eligio.
 *
 * Al pasar el cursor por cada fila aparece una vista previa que sigue al
 * mouse con inercia. El seguimiento corre en requestAnimationFrame y escribe
 * directo en el estilo, sin pasar por el estado de React: un setState por
 * frame vuelve a renderizar el arbol entero y colapsa.
 */
const Services = () => {
  const t = useT();
  const listRef = useRef<HTMLDivElement>(null);
  const peekRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const peek = peekRef.current;
    if (!list || !peek) return;
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    if (!window.matchMedia(FINE_POINTER).matches) return;

    const img = peek.querySelector('img');
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let active = false;
    let raf: number | null = null;

    const loop = () => {
      x += (targetX - x) * 0.14;
      y += (targetY - y) * 0.14;
      peek.style.translate = `${x}px ${y}px`;
      raf = active || Math.abs(targetX - x) > 0.5 ? requestAnimationFrame(loop) : null;
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const rows = Array.from(list.querySelectorAll<HTMLElement>('.svc__item'));
    const enter = (row: HTMLElement) => () => {
      if (img) img.src = row.dataset.peek ?? '';
      active = true;
      peek.classList.add('is-on');
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const leave = () => {
      active = false;
      peek.classList.remove('is-on');
    };

    const handlers = rows.map((row) => {
      const on = enter(row);
      row.addEventListener('mouseenter', on);
      row.addEventListener('mouseleave', leave);
      return { row, on };
    });
    list.addEventListener('mousemove', onMove);

    return () => {
      handlers.forEach(({ row, on }) => {
        row.removeEventListener('mouseenter', on);
        row.removeEventListener('mouseleave', leave);
      });
      list.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="peek" ref={peekRef} aria-hidden="true">
        <img src="" alt="" />
      </div>

      <section className="sec sec--tint" id="servicios">
        <div className="wrap">
          <div className="rv">
            <h2 className="dsp dsp--md svc__title" data-split>
              {t.services.title}
            </h2>
            <p className="lead svc__lead">{t.services.lead}</p>
          </div>

          <div className="svc" ref={listRef}>
            {t.services.items.map((service, i) => (
              <div
                key={service.title}
                className="svc__item rv"
                data-peek={PEEKS[i]}
                style={{ '--d': `${i * 90}ms` } as React.CSSProperties}
              >
                <div className="svc__n">{String(i + 1).padStart(2, '0')}</div>
                <h3>{service.title}</h3>
                <div>
                  <p className="body">{service.body}</p>
                  <span className="svc__note">{service.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;

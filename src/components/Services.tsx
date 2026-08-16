import { useEffect, useRef } from 'react';
import './Services.css';

const SERVICES = [
  {
    title: 'Desarrollo a medida',
    body: 'Sistemas construidos alrededor de cómo trabaja tu equipo, no al revés. Empezamos entendiendo la operación real antes de escribir una línea de código.',
    note: 'Inventarios, trazabilidad, gestión comercial, integraciones con lo que ya usas.',
    peek: 'https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdXB3azYxODAyMjQyLXdpa2ltZWRpYS1pbWFnZS1rcDZhZTV4Zy5qcGc.jpg',
  },
  {
    title: 'IA aplicada',
    body: 'Inteligencia artificial donde resuelve algo concreto: clasificar documentos, responder consultas repetidas, extraer datos de facturas.',
    note: 'No hacemos IA para poder decir que hacemos IA.',
    peek: 'https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL3B4OTQ1Nzc0LWltYWdlLWt6MmViNDEzLmpwZw.jpg',
  },
  {
    title: 'Automatización',
    body: 'Esa tarea que alguien de tu equipo repite todos los martes durante tres horas. La identificamos, la medimos y la convertimos en un flujo automático.',
    note: 'Empezamos por la que más tiempo te come.',
    peek: 'https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL3B4MTQwNzU3NC1pbWFnZS1rejJlOGVuby5qcGc.jpg',
  },
];

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
              Cuando ningún producto resuelve lo tuyo.
            </h2>
            <p className="lead svc__lead">Tres formas de trabajar juntos. No hay una cuarta.</p>
          </div>

          <div className="svc" ref={listRef}>
            {SERVICES.map((service, i) => (
              <div
                key={service.title}
                className="svc__item rv"
                data-peek={service.peek}
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

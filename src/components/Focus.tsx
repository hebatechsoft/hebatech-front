import { Clock } from '@phosphor-icons/react';
import './Focus.css';

const STEPS = [
  {
    title: 'Diagnosticamos',
    body: 'Nos sentamos con quien hace el trabajo hoy y miramos el proceso real. Sales de ahí con un alcance escrito y un precio cerrado.',
    when: '1 semana, sin costo',
  },
  {
    title: 'Construimos',
    body: 'Entregas cada dos semanas, funcionando y en tus manos. Nada de desaparecer tres meses y volver con una sorpresa.',
    when: 'Primera versión usable en 4 a 6 semanas',
  },
  {
    title: 'Acompañamos',
    body: 'Capacitamos al equipo, ajustamos lo que la realidad desmienta y seguimos disponibles después del lanzamiento.',
    when: 'Soporte continuo',
  },
];

/**
 * Enfoque. Fusiona manifiesto y proceso en UNA seccion.
 *
 * Antes el proceso era una pila sticky de tres tarjetas a pantalla completa:
 * 300vh de scroll para leer tres parrafos. Impresionaba la primera vez y
 * cansaba siempre. Aca la misma informacion entra en menos de una pantalla.
 *
 * La imagen es un recorte vertical de la MISMA foto del hero: arriba el
 * diagrama de flujo de la pared, abajo el codigo en el monitor. Al salir del
 * mismo archivo, la luz y la paleta calzan exactas con el inicio.
 */
const Focus = () => (
  <section className="sec focus" id="enfoque">
    <div className="focus__img" aria-hidden="true">
      <img src="/enfoque.webp" alt="" width={846} height={1536} loading="lazy" />
    </div>

    <div className="wrap">
      <div className="focus__in">
        <div className="rv">
          <h2 className="dsp dsp--md focus__title" data-split>
            El problema nunca es el software. Es <span className="hand">el proceso que nadie escribió.</span>
          </h2>
          <p className="body focus__body">
            Casi todas las empresas con las que trabajamos ya tienen un sistema: está repartido entre
            tres hojas de cálculo, un cuaderno y la cabeza de la persona que lleva quince años ahí.
          </p>
          <p className="body focus__body">
            Empezamos por entender ese sistema antes de reemplazarlo. Después escribimos software.
          </p>
        </div>

        <ol className="steps rv" style={{ '--d': '120ms' } as React.CSSProperties}>
          {STEPS.map((step, i) => (
            <li key={step.title} className="step">
              <div className="step__n">{String(i + 1).padStart(2, '0')}</div>
              <div>
                <h3>{step.title}</h3>
                <p className="body">{step.body}</p>
                <div className="step__when">
                  <Clock size={14} />
                  {step.when}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default Focus;

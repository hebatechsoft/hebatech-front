import { Clock } from '@phosphor-icons/react';
import { useT } from '../i18n';
import './Focus.css';

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
const Focus = () => {
  const t = useT();
  return (
  <section className="sec focus" id="enfoque">
    <div className="focus__img" aria-hidden="true">
      <img src="/enfoque.webp" alt="" width={846} height={1536} loading="lazy" />
    </div>

    <div className="wrap">
      <div className="focus__in">
        <div className="rv">
          <h2 className="dsp dsp--md focus__title" data-split>
            {t.focus.title.pre}
            <span className="hand">{t.focus.title.hand}</span>
          </h2>
          <p className="body focus__body">{t.focus.body1}</p>
          <p className="body focus__body">{t.focus.body2}</p>
        </div>

        <ol className="steps rv" style={{ '--d': '120ms' } as React.CSSProperties}>
          {t.focus.steps.map((step, i) => (
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
};

export default Focus;

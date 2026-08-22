import { LockSimple } from '@phosphor-icons/react';
import './Work.css';

/**
 * Trabajo. Deliberadamente vacio.
 *
 * El sitio anterior publicaba "50+ proyectos" y "98% de satisfaccion" sin
 * nada que los respaldara. Un espacio vacio con una razon honesta genera
 * mas confianza que una cifra que nadie puede verificar, y ademas obliga a
 * salir a conseguir el primer caso documentado.
 *
 * Se reemplaza por un caso real cuando exista, con nombre de empresa y
 * permiso para publicarlo.
 */
const Work = () => (
  <section className="sec wrap work" id="trabajo">
    <div className="work__in">
      <div className="work__frame rv" aria-hidden="true">
        <span>Reservado</span>
      </div>

      <div className="rv" style={{ '--d': '100ms' } as React.CSSProperties}>
        <div className="eyebrow work__eyebrow">Trabajo</div>
        <h2 className="dsp dsp--md" data-split>
          Este espacio está vacío a propósito.
        </h2>
        <p className="lead work__lead">
          Acá va un caso real: qué hacían antes, qué hacen ahora, cuánto tiempo recuperaron. Con
          nombre de empresa y con permiso para publicarlo. Preferimos dejarlo vacío antes que
          inventar un número que nadie puede verificar.
        </p>
        <div className="work__tag">
          <LockSimple size={14} />
          Se publica con el primer caso documentado
        </div>
      </div>
    </div>
  </section>
);

export default Work;

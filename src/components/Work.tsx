import { ArrowRight, CheckCircle, MapPin } from '@phosphor-icons/react';
import './Work.css';

/**
 * Trabajo. Primer caso real y documentado.
 *
 * El mismo criterio que dejaba esta seccion vacia (nada de cifras que nadie
 * puede verificar) sigue vigente aca: los numeros son los que dio el
 * cliente, no una redondeada "mas rapido" generica.
 */
const Work = () => (
  <section className="sec wrap work" id="trabajo">
    <div className="work__in">
      <div className="work__case rv vib">
        <div className="work__case-tag">
          <MapPin size={12} />
          Medellín · Enero 2026
        </div>
        <div className="work__case-stat">
          <span className="work__case-before">4 días</span>
          <ArrowRight size={18} />
          <span className="work__case-after">Minutos</span>
        </div>
        <p className="work__case-caption">Cierre de mes, antes y después.</p>
      </div>

      <div className="rv" style={{ '--d': '100ms' } as React.CSSProperties}>
        <div className="eyebrow work__eyebrow">Trabajo</div>
        <h2 className="dsp dsp--md" data-split>
          De cuatro días a minutos.
        </h2>
        <p className="lead work__lead">
          Acabados y Estilos en Madera, de Medellín, llevaba ventas, inventario, clientes y pagos
          pendientes a mano, todo en Excel. Les construimos un sistema a medida para manejarlo
          desde un solo lugar, entregado en el tiempo estimado. Se implementó en enero de 2026: el
          cierre de mes que antes tomaba casi cuatro días ahora se hace en minutos, todo a un clic.
        </p>
        <div className="work__tag">
          <CheckCircle size={14} />
          Caso real, publicado con permiso del cliente
        </div>
      </div>
    </div>
  </section>
);

export default Work;

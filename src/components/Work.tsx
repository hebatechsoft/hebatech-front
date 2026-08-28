import { ArrowRight, CheckCircle, MapPin } from '@phosphor-icons/react';
import { useT } from '../i18n';
import './Work.css';

/**
 * Trabajo. Primer caso real y documentado.
 *
 * El mismo criterio que dejaba esta seccion vacia (nada de cifras que nadie
 * puede verificar) sigue vigente aca: los numeros son los que dio el
 * cliente, no una redondeada "mas rapido" generica.
 */
const Work = () => {
  const t = useT();
  return (
  <section className="sec wrap work" id="trabajo">
    <div className="work__in">
      <div className="work__case rv vib">
        <div className="work__case-tag">
          <MapPin size={12} />
          {t.work.caseTag}
        </div>
        <div className="work__case-stat">
          <span className="work__case-before">{t.work.before}</span>
          <ArrowRight size={18} />
          <span className="work__case-after">{t.work.after}</span>
        </div>
        <p className="work__case-caption">{t.work.caption}</p>
      </div>

      <div className="rv" style={{ '--d': '100ms' } as React.CSSProperties}>
        <div className="eyebrow work__eyebrow">{t.work.eyebrow}</div>
        <h2 className="dsp dsp--md" data-split>
          {t.work.title}
        </h2>
        <p className="lead work__lead">{t.work.lead}</p>
        <div className="work__tag">
          <CheckCircle size={14} />
          {t.work.tag}
        </div>
      </div>
    </div>
    </section>
  );
};

export default Work;

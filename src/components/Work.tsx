import { ArrowRight, CheckCircle, MapPin } from '@phosphor-icons/react';
import { useT } from '../i18n';
// Las tarjetas de sitios usan la misma familia visual que las de producto
// (.prod, .prod__stage, .prod__shot...). Una sola fuente para ese material.
import './Products.css';
import './Work.css';

type Site = {
  name: string;
  /** Clave en el diccionario: t.work.sites[copyKey] */
  copyKey: 'acabados' | 'goldenHair';
  href: string;
  /** Captura del inicio a 1508x980, igual que la de Rave. */
  shot: { src: string; srcSet: string };
};

const SITES: Site[] = [
  {
    name: 'Acabados y Estilos en Madera',
    copyKey: 'acabados',
    href: 'https://acabadosyestilosenmadera.shop',
    shot: { src: '/acabados.webp', srcSet: '/acabados-sm.webp 754w, /acabados.webp 1508w' },
  },
  {
    name: 'Golden Hair',
    copyKey: 'goldenHair',
    href: 'https://www.goldenhair.shop',
    shot: { src: '/golden-hair.webp', srcSet: '/golden-hair-sm.webp 754w, /golden-hair.webp 1508w' },
  },
];

/**
 * Trabajo. Primer caso real y documentado, y debajo los sitios publicados.
 *
 * El mismo criterio que dejaba esta seccion vacia (nada de cifras que nadie
 * puede verificar) sigue vigente aca: los numeros son los que dio el
 * cliente, no una redondeada "mas rapido" generica. Los sitios tampoco
 * llevan cifras: el enlace al sitio en vivo es la prueba.
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

    <div className="work__sites-head rv">
      <h3 className="work__sites-title">{t.work.sites.title}</h3>
      <p className="body">{t.work.sites.lead}</p>
    </div>

    <div className="work__sites">
      {SITES.map((site, i) => {
        const copy = t.work.sites[site.copyKey];
        return (
          <article
            key={site.name}
            className="prod rv"
            style={{ '--d': `${80 + i * 100}ms` } as React.CSSProperties}
          >
            <div className="prod__stage">
              <span className="prod__state prod__state--near">
                <span className="dot" />
                {t.work.sites.state}
              </span>
              <img
                className="prod__shot"
                src={site.shot.src}
                srcSet={site.shot.srcSet}
                sizes="(max-width: 1040px) 92vw, 46vw"
                width={1508}
                height={980}
                alt={copy.alt}
                loading="lazy"
              />
            </div>

            <div className="prod__body">
              <h4>{site.name}</h4>
              <span className="work__site-host">{new URL(site.href).host.replace(/^www\./, '')}</span>
              <p className="body prod__blurb">{copy.blurb}</p>
              <ul className="prod__specs">
                {copy.specs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
              <div className="prod__foot">
                <a
                  href={site.href}
                  className="btn btn--line btn--sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.work.sites.cta} <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
    </section>
  );
};

export default Work;

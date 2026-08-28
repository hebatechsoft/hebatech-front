import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight } from '@phosphor-icons/react';
import { useSplitFill } from '../hooks/useSplitFill';
import { useT } from '../i18n';
import './Hero.css';

const HERO_IMG = '/hero.webp';

/**
 * Contenido del hero. Se renderiza DOS veces:
 *
 *   variant "cut"   dentro del velo, con el titular relleno de foto
 *   variant "solid" encima, con el titular en color plano
 *
 * Las dos copias comparten layout exacto, por eso el calado cae en el pixel
 * justo sin numeros magicos. En el mockup HTML esto era marcado duplicado a
 * mano; aca se escribe una sola vez.
 *
 * En la copia calada el eyebrow y el pie van con visibility:hidden: ocupan
 * su lugar para reservar el espacio, pero no se ven ni se leen.
 */
const HeroCopy = ({ variant }: { variant: 'cut' | 'solid' }) => {
  const t = useT();
  return (
  <div className="wrap hero__copy">
    <div className="hero__eyebrow">
      <span className="eyebrow">{t.hero.eyebrow}</span>
    </div>

    <h1 className={variant === 'cut' ? 'hero__cut' : undefined}>
      <span className="ln">
        <span style={{ '--d': '150ms' } as React.CSSProperties}>{t.hero.line1}</span>
      </span>
      <span className="ln">
        <span className="hand" style={{ '--d': '300ms' } as React.CSSProperties}>
          {t.hero.line2}
        </span>
      </span>
      <span className="ln">
        <span
          className={variant === 'solid' ? 'sage' : undefined}
          style={{ '--d': '450ms' } as React.CSSProperties}
        >
          {t.hero.line3}
        </span>
      </span>
    </h1>

    <div className="hero__foot">
      <p className="lead hero__lead">{t.hero.lead}</p>
      <div className="hero__cta">
        {variant === 'solid' ? (
          <>
            <a href="#contacto" className="btn btn--solid btn--lg">
              {t.hero.ctaPrimary}
            </a>
            <a href="#productos" className="btn btn--glass btn--lg">
              {t.hero.ctaSecondary} <ArrowDownRight size={17} />
            </a>
          </>
        ) : (
          <>
            <span className="btn btn--solid btn--lg">{t.hero.ctaPrimary}</span>
            <span className="btn btn--glass btn--lg">{t.hero.ctaSecondary}</span>
          </>
        )}
      </div>
    </div>
  </div>
  );
};

/**
 * Hero con split overlay.
 *
 * Tres capas, ninguna con mix-blend-mode:
 *   1. la foto
 *   2. un velo opaco, enmascarado con degradado hasta el corte
 *   3. la copia del titular rellena con la misma foto, encima del velo
 *
 * Se probaron multiply y overlay: los dos calculan el resultado a partir del
 * pixel de abajo, asi que sobre las zonas brillantes de la foto la letra se
 * perdia. Con relleno propio, el brillo de las letras es un parametro y no
 * una consecuencia.
 */
const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);
  const [fxOff, setFxOff] = useState(false);

  useSplitFill(heroRef, imgRef);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <header
      id="top"
      ref={heroRef}
      className={`hero ${ready ? 'is-ready' : ''} ${fxOff ? 'is-flat' : ''}`}
    >
      <div className="hero__bg">
        <img
          ref={imgRef}
          src={HERO_IMG}
          srcSet="/hero-sm.webp 1024w, /hero.webp 1672w"
          sizes="100vw"
          alt=""
          width={1672}
          height={941}
          fetchPriority="high"
          /* Si la foto falla, se apaga el calado y el titular queda solido y
             legible. Sin esto, un error de red borraba el titular entero. */
          onError={() => setFxOff(true)}
        />
      </div>

      <div className="hero__veil" aria-hidden="true">
        <HeroCopy variant="cut" />
      </div>

      <div className="hero__wash" />

      <div className="hero__content">
        <HeroCopy variant="solid" />
      </div>
    </header>
  );
};

export default Hero;

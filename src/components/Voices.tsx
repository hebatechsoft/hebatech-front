import { useT } from '../i18n';
import './Voices.css';

/**
 * Frases de problema, sin atribucion. NO son testimonios: no hay ningun
 * cliente respaldandolas todavia, y la nota lo dice de forma explicita.
 *
 * Van en serif italica porque son voz humana describiendo trabajo manual,
 * que es exactamente el registro que la serif marca en todo el sitio.
 *
 * Cuando existan clientes que autoricen citarlos con nombre, esta seccion
 * se reemplaza por testimonios reales.
 */
const Voices = () => {
  const t = useT();
  return (
  <section className="voices">
    <div className="wrap">
      <div className="voices__head rv">
        <h2 className="dsp dsp--md" data-split>
          {t.voices.title}
        </h2>
        <p className="voices__note">{t.voices.note}</p>
      </div>

      {/* Rejilla y no marquesina: leer exige quietud. Texto que se desplaza
          solo obliga a perseguirlo, y si una frase te interesa, se va.
          El movimiento vive en la entrada escalonada, que ordena la lectura
          en vez de estorbarla. */}
      <div className="voices__grid">
        {t.voices.phrases.map((phrase, i) => (
          <figure
            key={phrase}
            className="voice vib rv"
            style={{ '--d': `${i * 80}ms` } as React.CSSProperties}
          >
            <p>{phrase}</p>
          </figure>
        ))}
      </div>
    </div>
    </section>
  );
};

export default Voices;

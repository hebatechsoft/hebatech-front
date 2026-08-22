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
const PHRASES = [
  'Tengo el inventario en tres Excel y ninguno coincide.',
  'Los pedidos entran por WhatsApp y alguno siempre se pierde.',
  'Cierro el mes con una semana de atraso. Todos los meses.',
  'Si falta la persona que lleva la caja, nadie sabe dónde quedó nada.',
  'Para saber cuánto stock hay tengo que preguntarle a alguien.',
];

const Voices = () => (
  <section className="voices">
    <div className="wrap">
      <div className="voices__head rv">
        <h2 className="dsp dsp--md" data-split>
          Así arranca casi toda primera reunión.
        </h2>
        <p className="voices__note">
          No son testimonios. Son las frases que más escuchamos cuando alguien nos cuenta cómo
          trabaja hoy.
        </p>
      </div>

      {/* Rejilla y no marquesina: leer exige quietud. Texto que se desplaza
          solo obliga a perseguirlo, y si una frase te interesa, se va.
          El movimiento vive en la entrada escalonada, que ordena la lectura
          en vez de estorbarla. */}
      <div className="voices__grid">
        {PHRASES.map((phrase, i) => (
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

export default Voices;

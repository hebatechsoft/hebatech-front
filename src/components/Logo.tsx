import './Logo.css';

type LogoProps = {
  /** Oculta el texto "HEBA" y deja solo la marca. Util en espacios chicos. */
  markOnly?: boolean;
  /** Lado del cuadrado de la marca, en px. */
  size?: number;
  className?: string;
};

/**
 * Marca HEBA. Dos soportes y un puente: lo que ya tenes, lo que queres,
 * y la conexion entre los dos.
 *
 * Existe como componente unico porque antes el SVG estaba duplicado
 * identico en Navbar y Footer, y un logo repetido es un logo que algun
 * dia va a estar desactualizado en la mitad de los lugares.
 *
 * Los colores salen de currentColor y de --sage via CSS, para que herede
 * el tema sin tocar el marcado.
 */
const Logo = ({ markOnly = false, size = 24, className = '' }: LogoProps) => (
  <span className={`logo ${className}`.trim()}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect className="logo__bar" x="6" y="6" width="5" height="20" />
      <rect className="logo__bar" x="21" y="6" width="5" height="20" />
      <rect className="logo__bridge" x="11" y="13.5" width="10" height="5" />
    </svg>
    {!markOnly && <span className="logo__word">HEBA</span>}
  </span>
);

export default Logo;

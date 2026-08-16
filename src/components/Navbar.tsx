import { useEffect, useRef, useState } from 'react';
import { List, X } from '@phosphor-icons/react';
import Logo from './Logo';
import './Navbar.css';

const LINKS = [
  { href: '#productos', label: 'Productos' },
  { href: '#enfoque', label: 'Enfoque' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#trabajo', label: 'Trabajo' },
];

/**
 * Barra superior. Al despegarse del tope se condensa en una capsula
 * flotante de vibrancy: es el gesto mas reconocible de macOS y el que le
 * da el aire de aplicacion al sitio.
 *
 * El estado se detecta con un sentinel de 1px y un IntersectionObserver,
 * no con un listener de scroll.
 */
const Navbar = () => {
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), {
      threshold: 1,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // el menu movil bloquea el scroll de fondo mientras esta abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="nav__sentinel" />

      <nav className={`nav ${stuck ? 'is-stuck' : ''}`}>
        <div className="nav__in">
          <a href="#top" className="nav__brand" aria-label="HEBA, inicio">
            <Logo />
          </a>

          <div className="nav__links">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <a href="#contacto" className="btn btn--solid btn--sm nav__cta">
            Hablemos
          </a>

          <button
            className="nav__burger"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <List size={20} />
          </button>
        </div>
      </nav>

      <div className={`menu ${menuOpen ? 'is-open' : ''}`}>
        <button className="menu__close" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
          <X size={20} />
        </button>
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="#contacto" className="sage" onClick={() => setMenuOpen(false)}>
          Hablemos
        </a>
      </div>
    </>
  );
};

export default Navbar;

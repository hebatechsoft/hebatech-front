import { useEffect, useRef, useState } from 'react';
import { List, X } from '@phosphor-icons/react';
import Logo from './Logo';
import LangSwitch from './LangSwitch';
import { useT } from '../i18n';
import './Navbar.css';

/**
 * Barra superior. Al despegarse del tope se condensa en una capsula
 * flotante de vibrancy: es el gesto mas reconocible de macOS y el que le
 * da el aire de aplicacion al sitio.
 *
 * El estado se detecta con un sentinel de 1px y un IntersectionObserver,
 * no con un listener de scroll.
 */
const Navbar = () => {
  const t = useT();
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

  // El menu movil bloquea el scroll de fondo mientras esta abierto. Si no
  // esta abierto, este efecto no toca `overflow` para nada: el Loader
  // tambien lo usa durante la intro, y pisarlo en cada montaje (aunque sea
  // con '') le gana la carrera y libera el scroll antes de tiempo.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = 'hidden';
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
          <a href="#top" className="nav__brand" aria-label={t.nav.home}>
            <Logo />
          </a>

          <div className="nav__links">
            {t.nav.links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <LangSwitch className="nav__lang" />

          <a href="#contacto" className="btn btn--solid btn--sm nav__cta">
            {t.nav.cta}
          </a>

          <button
            className="nav__burger"
            onClick={() => setMenuOpen(true)}
            aria-label={t.nav.openMenu}
            aria-expanded={menuOpen}
          >
            <List size={20} />
          </button>
        </div>
      </nav>

      <div className={`menu ${menuOpen ? 'is-open' : ''}`}>
        <button className="menu__close" onClick={() => setMenuOpen(false)} aria-label={t.nav.closeMenu}>
          <X size={20} />
        </button>
        {t.nav.links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="#contacto" className="sage" onClick={() => setMenuOpen(false)}>
          {t.nav.cta}
        </a>
        <LangSwitch className="lang--menu" />
      </div>
    </>
  );
};

export default Navbar;

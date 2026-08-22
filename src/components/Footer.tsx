import { FacebookLogo, InstagramLogo, WhatsappLogo } from '@phosphor-icons/react';
import Logo from './Logo';
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, whatsappLink } from '../constants';
import './Footer.css';

const COLUMNS = [
  {
    title: 'Productos',
    links: [
      { href: 'https://raverp.store', label: 'Rave', external: true },
      { href: '#productos', label: 'Heba Barber' },
    ],
  },
  {
    title: 'Estudio',
    links: [
      { href: '#enfoque', label: 'Enfoque' },
      { href: '#servicios', label: 'Servicios' },
      { href: '#trabajo', label: 'Trabajo' },
    ],
  },
  {
    title: 'Contacto',
    links: [
      { href: `mailto:${CONTACT_EMAIL}`, label: CONTACT_EMAIL },
      { href: whatsappLink(), label: WHATSAPP_DISPLAY, external: true },
    ],
  },
];

const SOCIAL = [
  { href: 'https://www.instagram.com/hebatechsoft', label: 'Instagram', Icon: InstagramLogo },
  { href: 'https://www.facebook.com/profile.php?id=61587193170655', label: 'Facebook', Icon: FacebookLogo },
  { href: whatsappLink(), label: 'WhatsApp', Icon: WhatsappLogo },
];

/**
 * Footer. Tres capas de fondo detras del contenido:
 *
 *   cuadricula   textura de hoja de calculo. El sitio entero habla de
 *                reemplazarlas, asi que la marca se apoya sobre una.
 *   resplandor   la MISMA foto del hero, muy desenfocada. Las luces de la
 *                ciudad se vuelven bokeh y dan color y profundidad. Al ser
 *                el mismo archivo ya esta en cache: no cuesta un pedido mas.
 *   fantasma     el logotipo gigante, DETRAS del contenido y no debajo.
 */
const Footer = () => (
  <footer className="ft">
    <div className="ft__grid" aria-hidden="true" />
    <div className="ft__glow" aria-hidden="true">
      <img src="/hero.webp" alt="" loading="lazy" />
    </div>
    <div className="ft__ghost" aria-hidden="true">
      HEBA
    </div>

    <div className="wrap ft__in">
      <div className="ft__top">
        <div className="ft__brand">
          <div className="ft__word">HEBA.</div>
          <div className="ft__tag">Software con oficio</div>
          <p>
            Sistemas a medida y productos propios para empresas que crecieron más rápido que sus
            procesos.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div className="ft__col" key={column.title}>
            <h4>{column.title}</h4>
            {column.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...('external' in link && link.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="ft__bot">
        <div>© {new Date().getFullYear()} HEBA Studio, antes HebaTech. Medellín, Colombia.</div>
        <div className="ft__social">
          {SOCIAL.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
              <social.Icon size={15} weight="fill" />
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </div>

    <div className="ft__mark" aria-hidden="true">
      <Logo markOnly size={18} />
    </div>
  </footer>
);

export default Footer;

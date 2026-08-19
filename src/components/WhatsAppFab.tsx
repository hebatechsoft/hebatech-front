import { WhatsappLogo } from '@phosphor-icons/react';
import { whatsappLink } from '../constants';
import './WhatsAppFab.css';

const WhatsAppFab = () => (
  <a
    className="fab-wa"
    href={whatsappLink('Hola, quiero más información sobre Heba.')}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Escríbenos por WhatsApp"
  >
    <WhatsappLogo size={26} weight="fill" />
  </a>
);

export default WhatsAppFab;

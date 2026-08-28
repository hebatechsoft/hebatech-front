import { WhatsappLogo } from '@phosphor-icons/react';
import { whatsappLink } from '../constants';
import { useT } from '../i18n';
import './WhatsAppFab.css';

const WhatsAppFab = () => {
  const t = useT();
  return (
  <a
    className="fab-wa"
    href={whatsappLink(t.fab.message)}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={t.fab.label}
  >
      <WhatsappLogo size={26} weight="fill" />
    </a>
  );
};

export default WhatsAppFab;

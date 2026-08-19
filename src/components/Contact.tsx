import { useState, type FormEvent } from 'react';
import { ArrowRight, CaretDown, EnvelopeSimple, MapPin, WhatsappLogo } from '@phosphor-icons/react';
import { WHATSAPP_DISPLAY, whatsappLink } from '../constants';
import { validateLead, type LeadPayload } from '../lib/leadValidation';
import './Contact.css';

const EMAIL = 'contacto@hebatech.cloud';

const TOPICS = [
  'Rave, quiero implementarlo en mi empresa',
  'Heba Barber, quiero probarlo',
  'Un sistema a medida',
  'Automatizar un proceso',
  'Todavía no sé, quiero conversarlo',
];

const NEXT_STEPS = [
  'Te respondemos en menos de 24 horas hábiles. Siempre una persona, nunca un formulario automático.',
  'Media hora de llamada para entender qué se hace hoy a mano y cuánto tiempo cuesta.',
  'Si podemos ayudarte, te pasamos alcance y precio cerrado. Si no, te decimos quién.',
];

type Errors = { name?: boolean; contact?: boolean; message?: boolean };

/**
 * Contacto.
 *
 * El bloque "Que pasa despues" no es relleno: la gente no escribe por miedo
 * a lo que viene despues del envio. Es el contenido que mas convierte en un
 * formulario, y de paso llena el vacio de la columna izquierda.
 */
const Contact = () => {
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload: LeadPayload = {
      name: String(form.get('name') ?? ''),
      contact: String(form.get('contact') ?? ''),
      topic: String(form.get('topic') ?? ''),
      message: String(form.get('message') ?? ''),
    };

    const next = validateLead(payload);
    setErrors(next);
    if (next.name || next.contact || next.message) {
      setStatus('Revisa los campos marcados.');
      return;
    }

    setSending(true);
    setStatus('Enviando.');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('request_failed');
      setStatus('Listo. Te respondemos en menos de 24 horas hábiles.');
      e.currentTarget.reset();
    } catch {
      setStatus(`No pudimos enviarlo. Escríbenos directo a ${EMAIL} o por WhatsApp.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="sec sec--tint" id="contacto">
      <div className="wrap">
        <div className="ct">
          <div className="rv">
            <h2 className="dsp dsp--md" data-split>
              Cuéntanos qué estás <span className="hand">resolviendo a mano.</span>
            </h2>
            <p className="lead ct__lead">
              Respondemos en menos de 24 horas hábiles. Hablas directo con quien va a construir tu
              sistema, no con un vendedor.
            </p>

            <div className="ct__direct">
              <a href={`mailto:${EMAIL}`}>
                <EnvelopeSimple size={18} />
                {EMAIL}
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <WhatsappLogo size={18} />
                {WHATSAPP_DISPLAY}
              </a>
              <span className="ct__place">
                <MapPin size={18} />
                Medellín, Colombia
              </span>
            </div>

            <div className="ct__next">
              <h3>Qué pasa después</h3>
              <ol>
                {NEXT_STEPS.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          <form
            className="form vib rv"
            onSubmit={handleSubmit}
            noValidate
            style={{ '--d': '100ms' } as React.CSSProperties}
          >
            <div className={`field ${errors.name ? 'has-err' : ''}`}>
              <label htmlFor="i-name">Nombre</label>
              <input id="i-name" name="name" type="text" autoComplete="name" placeholder="Cómo te llamas" />
              <span className="err">Necesitamos un nombre para responderte.</span>
            </div>

            <div className={`field ${errors.contact ? 'has-err' : ''}`}>
              <label htmlFor="i-contact">Email o WhatsApp</label>
              <span className="help">Por dónde prefieres que te escribamos.</span>
              <input
                id="i-contact"
                name="contact"
                type="text"
                placeholder="correo@empresa.com o 300 000 0000"
              />
              <span className="err">Déjanos un email o un número válido para contactarte.</span>
            </div>

            <div className="field">
              <label htmlFor="i-topic">Qué necesitas</label>
              <div className="sel">
                <select id="i-topic" name="topic">
                  {TOPICS.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
                <CaretDown size={15} />
              </div>
            </div>

            <div className={`field ${errors.message ? 'has-err' : ''}`}>
              <label htmlFor="i-msg">Cuéntanos un poco</label>
              <span className="help">Qué se hace hoy a mano en tu empresa.</span>
              <textarea
                id="i-msg"
                name="message"
                placeholder="Por ejemplo: cada semana alguien copia los pedidos del WhatsApp a un Excel."
              />
              <span className="err">Cuéntanos al menos un par de líneas.</span>
            </div>

            <button type="submit" className="btn btn--solid btn--lg form__submit" disabled={sending}>
              {sending ? 'Enviando' : 'Enviar'}
              {!sending && <ArrowRight size={17} />}
            </button>
            <p className="form__status" role="status">
              {status}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

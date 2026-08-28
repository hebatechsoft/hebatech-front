import { useState, type FormEvent } from 'react';
import { ArrowRight, CaretDown, EnvelopeSimple, MapPin, WhatsappLogo } from '@phosphor-icons/react';
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, whatsappLink } from '../constants';
import { validateLead, type LeadPayload } from '../lib/leadValidation';
import { useT } from '../i18n';
import './Contact.css';

type Errors = { name?: boolean; email?: boolean; whatsapp?: boolean; message?: boolean };

/**
 * Contacto.
 *
 * El bloque "Que pasa despues" no es relleno: la gente no escribe por miedo
 * a lo que viene despues del envio. Es el contenido que mas convierte en un
 * formulario, y de paso llena el vacio de la columna izquierda.
 */
const Contact = () => {
  const t = useT();
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload: LeadPayload = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      whatsapp: String(form.get('whatsapp') ?? ''),
      topic: String(form.get('topic') ?? ''),
      message: String(form.get('message') ?? ''),
    };

    const next = validateLead(payload);
    setErrors(next);
    if (next.name || next.email || next.whatsapp || next.message) {
      setStatus(t.contact.form.checkFields);
      return;
    }

    setSending(true);
    setStatus(t.contact.form.sendingStatus);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('request_failed');
      setStatus(t.contact.form.ok);
      formEl.reset();
    } catch {
      setStatus(t.contact.form.fail.replace('{email}', CONTACT_EMAIL));
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
              {t.contact.title.pre}
              <span className="hand">{t.contact.title.hand}</span>
            </h2>
            <p className="lead ct__lead">{t.contact.lead}</p>

            <div className="ct__direct">
              <a href={`mailto:${CONTACT_EMAIL}`}>
                <EnvelopeSimple size={18} />
                {CONTACT_EMAIL}
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <WhatsappLogo size={18} />
                {WHATSAPP_DISPLAY}
              </a>
              <span className="ct__place">
                <MapPin size={18} />
                {t.contact.place}
              </span>
            </div>

            <div className="ct__next">
              <h3>{t.contact.nextTitle}</h3>
              <ol>
                {t.contact.nextSteps.map((step) => (
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
              <label htmlFor="i-name">{t.contact.form.name}</label>
              <input id="i-name" name="name" type="text" autoComplete="name" placeholder={t.contact.form.namePlaceholder} />
              <span className="err">{t.contact.form.nameError}</span>
            </div>

            <div className={`field ${errors.email ? 'has-err' : ''}`}>
              <label htmlFor="i-email">{t.contact.form.email}</label>
              <input id="i-email" name="email" type="email" autoComplete="email" placeholder={t.contact.form.emailPlaceholder} />
              <span className="err">{t.contact.form.emailError}</span>
            </div>

            <div className={`field ${errors.whatsapp ? 'has-err' : ''}`}>
              <label htmlFor="i-whatsapp">{t.contact.form.whatsapp}</label>
              <span className="help">{t.contact.form.whatsappHelp}</span>
              <input id="i-whatsapp" name="whatsapp" type="text" autoComplete="tel" placeholder="300 000 0000" />
              <span className="err">{t.contact.form.whatsappError}</span>
            </div>

            <div className="field">
              <label htmlFor="i-topic">{t.contact.form.topic}</label>
              <div className="sel">
                <select id="i-topic" name="topic">
                  {t.contact.topics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
                <CaretDown size={15} />
              </div>
            </div>

            <div className={`field ${errors.message ? 'has-err' : ''}`}>
              <label htmlFor="i-msg">{t.contact.form.message}</label>
              <span className="help">{t.contact.form.messageHelp}</span>
              <textarea
                id="i-msg"
                name="message"
                placeholder={t.contact.form.messagePlaceholder}
              />
              <span className="err">{t.contact.form.messageError}</span>
            </div>

            <button type="submit" className="btn btn--solid btn--lg form__submit" disabled={sending}>
              {sending ? t.contact.form.sending : t.contact.form.submit}
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

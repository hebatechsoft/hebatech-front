const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s()-]{6,}$/;

export type LeadPayload = {
  name: string;
  email: string;
  whatsapp: string;
  topic: string;
  message: string;
};

export const isValidName = (name: string) => name.trim().length >= 2;

export const isValidEmail = (email: string) => EMAIL_RE.test(email.trim());

export const isValidWhatsapp = (whatsapp: string) => {
  const value = whatsapp.trim();
  return value === '' || PHONE_RE.test(value);
};

export const isValidMessage = (message: string) => message.trim().length >= 10;

export const validateLead = (payload: Partial<LeadPayload>) => ({
  name: !isValidName(payload.name ?? ''),
  email: !isValidEmail(payload.email ?? ''),
  whatsapp: !isValidWhatsapp(payload.whatsapp ?? ''),
  message: !isValidMessage(payload.message ?? ''),
});

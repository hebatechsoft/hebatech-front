const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s()-]{6,}$/;

export type LeadPayload = {
  name: string;
  contact: string;
  topic: string;
  message: string;
};

export const isValidName = (name: string) => name.trim().length >= 2;

export const isValidContact = (contact: string) => {
  const value = contact.trim();
  return EMAIL_RE.test(value) || PHONE_RE.test(value);
};

export const isValidMessage = (message: string) => message.trim().length >= 10;

export const validateLead = (payload: Partial<LeadPayload>) => ({
  name: !isValidName(payload.name ?? ''),
  contact: !isValidContact(payload.contact ?? ''),
  message: !isValidMessage(payload.message ?? ''),
});

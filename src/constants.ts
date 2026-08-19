export const WHATSAPP_NUMBER = '573148126301';
export const WHATSAPP_DISPLAY = '+57 314 812 6301';

export const whatsappLink = (message?: string) => {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

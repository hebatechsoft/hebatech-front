import { describe, expect, it } from 'vitest';
import { isValidEmail, isValidMessage, isValidName, isValidWhatsapp, validateLead } from './leadValidation';

describe('isValidName', () => {
  it('rechaza nombre vacío o de una sola letra', () => {
    expect(isValidName('')).toBe(false);
    expect(isValidName('  ')).toBe(false);
    expect(isValidName('A')).toBe(false);
  });
  it('acepta nombres reales', () => {
    expect(isValidName('Ana')).toBe(true);
    expect(isValidName('  Jo  ')).toBe(true);
  });
});

describe('isValidEmail', () => {
  it('acepta emails con formato correcto', () => {
    expect(isValidEmail('correo@empresa.com')).toBe(true);
    expect(isValidEmail('nombre.apellido@sub.dominio.co')).toBe(true);
  });
  it('rechaza emails sin @ o sin dominio', () => {
    expect(isValidEmail('correo')).toBe(false);
    expect(isValidEmail('correo@')).toBe(false);
    expect(isValidEmail('correo@empresa')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});

describe('isValidWhatsapp', () => {
  it('el campo vacío es válido: es opcional', () => {
    expect(isValidWhatsapp('')).toBe(true);
    expect(isValidWhatsapp('   ')).toBe(true);
  });
  it('acepta números con formato razonable', () => {
    expect(isValidWhatsapp('300 000 0000')).toBe(true);
    expect(isValidWhatsapp('+57 314 812 6301')).toBe(true);
  });
  it('rechaza texto que no es un número', () => {
    expect(isValidWhatsapp('no tengo')).toBe(false);
    expect(isValidWhatsapp('123')).toBe(false);
  });
});

describe('isValidMessage', () => {
  it('exige al menos 10 caracteres reales', () => {
    expect(isValidMessage('muy corto')).toBe(false);
    expect(isValidMessage('          ')).toBe(false);
  });
  it('acepta mensajes con contenido', () => {
    expect(isValidMessage('Llevamos el inventario en Excel y no cuadra.')).toBe(true);
  });
});

describe('validateLead', () => {
  it('no marca error en ningún campo cuando el payload es válido', () => {
    const errors = validateLead({
      name: 'Ana',
      email: 'ana@empresa.com',
      whatsapp: '',
      message: 'Cuéntanos qué necesitas resolver, por favor.',
    });
    expect(errors).toEqual({ name: false, email: false, whatsapp: false, message: false });
  });

  it('marca error en cada campo inválido de forma independiente', () => {
    const errors = validateLead({ name: '', email: 'no-es-email', whatsapp: 'abc', message: 'corto' });
    expect(errors).toEqual({ name: true, email: true, whatsapp: true, message: true });
  });
});

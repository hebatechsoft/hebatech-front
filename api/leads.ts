import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { validateLead, type LeadPayload } from '../src/lib/leadValidation';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as Partial<LeadPayload>;
  const errors = validateLead(body);

  if (errors.name || errors.contact || errors.message) {
    return res.status(400).json({ error: 'invalid_payload', errors });
  }

  const lead = {
    name: body.name!.trim(),
    contact: body.contact!.trim(),
    topic: body.topic?.trim() || null,
    message: body.message!.trim(),
  };

  const { error: dbError } = await supabase.from('leads').insert(lead);
  if (dbError) {
    console.error('supabase insert failed', dbError);
    return res.status(500).json({ error: 'storage_failed' });
  }

  const notifyTo = process.env.LEADS_NOTIFY_EMAIL;
  if (notifyTo) {
    const { error: mailError } = await resend.emails.send({
      from: 'Heba <leads@hebatech.cloud>',
      to: notifyTo,
      subject: `Nuevo contacto: ${lead.name}`,
      text: `Nombre: ${lead.name}\nContacto: ${lead.contact}\nTema: ${lead.topic ?? '-'}\n\n${lead.message}`,
    });
    if (mailError) {
      console.error('resend send failed', mailError);
    }
  }

  return res.status(200).json({ ok: true });
}

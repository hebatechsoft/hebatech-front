import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const { error } = await supabase.from('leads').select('id').limit(1);
  if (error) {
    console.error('keepalive query failed', error);
    return res.status(500).json({ ok: false });
  }
  return res.status(200).json({ ok: true });
}

-- Corre esto una vez en el SQL editor de Supabase (Project > SQL Editor).

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  whatsapp text,
  topic text,
  message text not null
);

-- RLS habilitado y sin policies: solo la service_role key (usada por la
-- funcion serverless, nunca por el navegador) puede leer o escribir.
alter table public.leads enable row level security;

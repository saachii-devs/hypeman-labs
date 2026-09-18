-- Messages sent through the "Write to us" form on the site.
-- Rows are written by a server action using the secret key, never from the browser.
create table public.contact_messages (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  phone text check (char_length(phone) <= 40),
  services text[] not null default '{}',
  budget text not null check (char_length(budget) between 1 and 40),
  message text not null check (char_length(message) between 1 and 4000)
);

create index contact_messages_created_at_idx on public.contact_messages (created_at desc);

-- RLS on with no policies: the publishable key can neither read nor write this table.
alter table public.contact_messages enable row level security;
revoke all on table public.contact_messages from anon, authenticated;

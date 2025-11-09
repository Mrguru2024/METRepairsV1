create table if not exists "quotes" (
  "id" uuid primary key default gen_random_uuid(),
  "name" text not null,
  "email" text not null,
  "phone" text not null,
  "service" text not null,
  "address" text not null,
  "zip" text not null,
  "description" text not null,
  "budget" text,
  "preferred_time" text,
  "attachments" jsonb,
  "created_at" timestamptz not null default now()
);

create index if not exists quotes_created_at_idx on "quotes" ("created_at" desc);

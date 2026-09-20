-- Run once in the Supabase SQL editor. No visitor tables are exposed to the browser.
begin;

create schema if not exists visitor_analytics;
revoke all on schema visitor_analytics from public, anon, authenticated;

create table if not exists visitor_analytics.visitors (
  id uuid primary key,
  public_id bigint generated always as identity unique,
  last_seen timestamptz not null default now()
);

create index if not exists visitors_last_seen_idx
  on visitor_analytics.visitors (last_seen desc, public_id desc);

create table if not exists visitor_analytics.page_views (
  id uuid primary key,
  created_at timestamptz not null default now()
);

create table if not exists visitor_analytics.totals (
  singleton boolean primary key default true check (singleton),
  views bigint not null default 0,
  visitors bigint not null default 0
);

insert into visitor_analytics.totals (singleton) values (true) on conflict do nothing;

alter table visitor_analytics.visitors enable row level security;
alter table visitor_analytics.page_views enable row level security;
alter table visitor_analytics.totals enable row level security;
revoke all on all tables in schema visitor_analytics from public, anon, authenticated;
revoke all on all sequences in schema visitor_analytics from public, anon, authenticated;

-- Definer access is limited to the aggregate and the last five anonymous aliases.
create or replace function public.get_portfolio_visitors()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'views', totals.views,
    'visitors', totals.visitors,
    'recent', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', recent.public_id::text,
        'avatar', ((recent.public_id - 1) % 4)::integer,
        'lastSeen', recent.last_seen
      ) order by recent.last_seen desc, recent.public_id desc)
      from (
        select public_id, last_seen from visitor_analytics.visitors
        order by last_seen desc, public_id desc limit 5
      ) recent
    ), '[]'::jsonb)
  )
  from visitor_analytics.totals totals where singleton = true;
$$;

-- UUIDs are browser-generated. A page-view UUID makes retries idempotent.
-- Serializing the small totals update prevents lost increments across visitors.
create or replace function public.record_portfolio_view(p_visitor_id uuid, p_view_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_visitors integer;
begin
  if p_visitor_id is null or p_view_id is null then
    raise exception 'Visitor and view IDs are required' using errcode = '22023';
  end if;

  perform 1 from visitor_analytics.totals where singleton = true for update;
  insert into visitor_analytics.page_views (id) values (p_view_id) on conflict do nothing;
  if found then
    insert into visitor_analytics.visitors (id, last_seen)
      values (p_visitor_id, clock_timestamp()) on conflict (id) do nothing;
    get diagnostics new_visitors = row_count;

    update visitor_analytics.visitors set last_seen = clock_timestamp() where id = p_visitor_id;
    update visitor_analytics.totals
      set views = views + 1, visitors = visitors + new_visitors where singleton = true;
  end if;

  return public.get_portfolio_visitors();
end;
$$;

revoke all on function public.get_portfolio_visitors() from public;
revoke all on function public.record_portfolio_view(uuid, uuid) from public;
grant execute on function public.get_portfolio_visitors() to anon, authenticated;
grant execute on function public.record_portfolio_view(uuid, uuid) to anon, authenticated;

commit;

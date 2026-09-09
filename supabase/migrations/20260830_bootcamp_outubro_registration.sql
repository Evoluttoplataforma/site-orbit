-- Inscrição atômica do Bootcamp Canais Orbit de 15/10/2026.
-- Presencial e mentoria consomem a mesma capacidade física de 40 lugares.

create or replace function public.register_bootcamp_lead(lead jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_source text := lead->>'source';
  effective_source text;
  registration_status text := 'registered';
  physical_count integer := 0;
  inserted_id public.live_orbit_leads.id%type;
  existing_id public.live_orbit_leads.id%type;
  existing_source text;
begin
  if requested_source not in (
    'bootcamp-orbit-online',
    'bootcamp-orbit-presencial',
    'bootcamp-orbit-mentoria'
  ) then
    raise exception 'invalid_bootcamp_source' using errcode = '22023';
  end if;

  if coalesce(nullif(trim(lead->>'nome'), ''), '') = ''
    or coalesce(nullif(trim(lead->>'email'), ''), '') = '' then
    raise exception 'missing_required_fields' using errcode = '22023';
  end if;

  effective_source := requested_source;

  if requested_source in ('bootcamp-orbit-presencial', 'bootcamp-orbit-mentoria') then
    perform pg_advisory_xact_lock(hashtext('bootcamp-orbit-2026-10-15-capacity'));

    select id, source
      into existing_id, existing_source
      from public.live_orbit_leads
     where lower(trim(email)) = lower(trim(lead->>'email'))
       and chosen_date::text = '2026-10-15'
       and source in (
         'bootcamp-orbit-presencial',
         'bootcamp-orbit-mentoria',
         'bootcamp-orbit-presencial-waitlist',
         'bootcamp-orbit-mentoria-waitlist'
       )
     order by created_at desc
     limit 1
     for update;

    select count(distinct lower(trim(email)))
      into physical_count
      from public.live_orbit_leads
     where source in ('bootcamp-orbit-presencial', 'bootcamp-orbit-mentoria')
       and chosen_date::text = '2026-10-15';

    if existing_id is not null
      and existing_source in ('bootcamp-orbit-presencial', 'bootcamp-orbit-mentoria') then
      if requested_source = 'bootcamp-orbit-mentoria'
        and existing_source = 'bootcamp-orbit-presencial' then
        update public.live_orbit_leads
           set source = 'bootcamp-orbit-mentoria'
         where id = existing_id;
        existing_source := 'bootcamp-orbit-mentoria';
      end if;

      return jsonb_build_object(
        'status', 'registered',
        'lead_id', existing_id,
        'physical_count', physical_count,
        'duplicate', true,
        'source', existing_source
      );
    end if;

    if physical_count >= 40 then
      registration_status := 'waitlist';
      effective_source := requested_source || '-waitlist';
      if existing_id is not null then
        update public.live_orbit_leads
           set source = effective_source
         where id = existing_id;
        return jsonb_build_object(
          'status', 'waitlist',
          'lead_id', existing_id,
          'physical_count', physical_count,
          'duplicate', true,
          'source', effective_source
        );
      end if;
    elsif existing_id is not null then
      update public.live_orbit_leads
         set source = requested_source
       where id = existing_id;
      return jsonb_build_object(
        'status', 'registered',
        'lead_id', existing_id,
        'physical_count', physical_count + 1,
        'promoted_from_waitlist', true,
        'source', requested_source
      );
    end if;
  end if;

  insert into public.live_orbit_leads (
    nome,
    email,
    telefone,
    empresa,
    source,
    chosen_date,
    landing_page,
    referrer,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    gclid,
    fbclid,
    session_id
  ) values (
    trim(lead->>'nome'),
    lower(trim(lead->>'email')),
    nullif(trim(lead->>'telefone'), ''),
    nullif(trim(lead->>'empresa'), ''),
    effective_source,
    '2026-10-15',
    nullif(lead->>'landing_page', ''),
    nullif(lead->>'referrer', ''),
    nullif(lead->>'utm_source', ''),
    nullif(lead->>'utm_medium', ''),
    nullif(lead->>'utm_campaign', ''),
    nullif(lead->>'utm_content', ''),
    nullif(lead->>'utm_term', ''),
    nullif(lead->>'gclid', ''),
    nullif(lead->>'fbclid', ''),
    nullif(lead->>'session_id', '')
  )
  returning id into inserted_id;

  return jsonb_build_object(
    'status', registration_status,
    'lead_id', inserted_id,
    'physical_count', case
      when requested_source = 'bootcamp-orbit-online' then null
      when registration_status = 'waitlist' then physical_count
      else physical_count + 1
    end
  );
end;
$$;

revoke all on function public.register_bootcamp_lead(jsonb) from public;
grant execute on function public.register_bootcamp_lead(jsonb) to anon, authenticated, service_role;

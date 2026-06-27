-- Client-side PRO bootstrap (no service role / Next.js API required)
-- Run after 01-auth.sql so signup can create tenant + membership from the browser.
--
-- Without these policies, only a service-role server route can insert into
-- tenants / tenant_members (chicken-and-egg: user has no tenant yet).

create policy "tenants_insert_authenticated"
  on public.tenants for insert
  to authenticated
  with check (true);

-- First workspace only: user may add themselves as owner once
create policy "tenant_members_insert_self_owner"
  on public.tenant_members for insert
  to authenticated
  with check (
    user_id = auth.uid()
    and role = 'owner'
    and not exists (
      select 1
      from public.tenant_members tm
      where tm.user_id = auth.uid()
    )
  );

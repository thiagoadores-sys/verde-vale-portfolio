-- =====================================================================
-- Verde Vale Orgânicos (EMPRESA FICTÍCIA) — schema inicial
-- Projeto de portfólio: perfis/admin, leads (LGPD) e pedidos de demonstração
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Perfis e papel de administrador
-- ---------------------------------------------------------------------
create table public.perfis (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.perfis enable row level security;

create policy "usuario le o proprio perfil" on public.perfis
  for select to authenticated using (id = (select auth.uid()));

-- security definer evita recursão de RLS ao consultar perfis
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce(
    (select p.is_admin from public.perfis p where p.id = (select auth.uid())),
    false
  );
$$;

-- Cria o perfil automaticamente quando um usuário se cadastra
create or replace function public.criar_perfil()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.perfis (id, nome) values (new.id, new.raw_user_meta_data ->> 'nome');
  return new;
end;
$$;

create trigger ao_criar_usuario after insert on auth.users
  for each row execute function public.criar_perfil();

-- ---------------------------------------------------------------------
-- 2. Leads do formulário do site (dados pessoais → LGPD)
-- ---------------------------------------------------------------------
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome text not null check (char_length(nome) between 2 and 120),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  telefone text check (char_length(telefone) <= 30),
  interesse text not null default 'outro'
    check (interesse in ('cesta_semanal', 'cesta_quinzenal', 'empresas', 'outro')),
  mensagem text check (char_length(mensagem) <= 2000),
  origem text check (char_length(origem) <= 60),
  consentimento_lgpd boolean not null,
  consentimento_em timestamptz not null default now()
);
alter table public.leads enable row level security;

-- Visitante só INSERE (com consentimento) e nunca lê
create policy "inserir lead com consentimento" on public.leads
  for insert to anon, authenticated with check (consentimento_lgpd = true);

create policy "admin le leads" on public.leads
  for select to authenticated using ((select public.is_admin()));

create policy "admin apaga leads" on public.leads
  for delete to authenticated using ((select public.is_admin()));

create index leads_created_at_idx on public.leads (created_at desc);

-- ---------------------------------------------------------------------
-- 3. Pedidos (DADOS FICTÍCIOS de demonstração do dashboard)
-- ---------------------------------------------------------------------
create table public.pedidos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  data date not null,
  canal text not null check (canal in ('site', 'whatsapp', 'feira', 'empresas')),
  regiao text not null,
  categoria text not null check (categoria in ('cestas', 'frutas', 'verduras', 'legumes')),
  valor numeric(10, 2) not null check (valor > 0),
  cliente_novo boolean not null default false
);
alter table public.pedidos enable row level security;

-- Leitura pública SÓ porque os dados são fictícios (dashboard de portfólio).
-- Em um cliente real, trocar por: to authenticated using (public.is_admin()).
create policy "leitura publica de dados ficticios" on public.pedidos
  for select to anon, authenticated using (true);
-- Sem políticas de insert/update/delete: só o seed (ou a chave secreta) grava.

create index pedidos_data_idx on public.pedidos (data);

-- ---------------------------------------------------------------------
-- 4. Views de KPI (security_invoker = o RLS de pedidos vale aqui também)
-- ---------------------------------------------------------------------
comment on table public.pedidos is
  'Pedidos fictícios. KPIs: receita = soma(valor); ticket médio = receita / pedidos; clientes novos = pedidos com cliente_novo.';

create view public.kpi_mensal with (security_invoker = true) as
select
  date_trunc('month', data)::date as mes,
  count(*)::int as pedidos,
  sum(valor)::numeric(12, 2) as receita,
  round(sum(valor) / count(*), 2)::numeric(10, 2) as ticket_medio,
  count(*) filter (where cliente_novo)::int as clientes_novos
from public.pedidos
group by 1;

create view public.vendas_mes_canal with (security_invoker = true) as
select date_trunc('month', data)::date as mes, canal,
       count(*)::int as pedidos, sum(valor)::numeric(12, 2) as receita
from public.pedidos
group by 1, 2;

create view public.vendas_mes_categoria with (security_invoker = true) as
select date_trunc('month', data)::date as mes, categoria,
       count(*)::int as pedidos, sum(valor)::numeric(12, 2) as receita
from public.pedidos
group by 1, 2;

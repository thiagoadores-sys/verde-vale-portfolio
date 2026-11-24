-- =====================================================================
-- DADOS FICTÍCIOS para demonstração (portfólio). Nenhum dado real.
-- Gera ~12 meses de pedidos relativos à data atual, sempre iguais (setseed).
-- Local: roda em `supabase db reset`. Remoto: `supabase db push --include-seed`.
-- =====================================================================

select setseed(0.42);

insert into public.pedidos (data, canal, regiao, categoria, valor, cliente_novo)
select
  d::date,
  (array['site', 'site', 'whatsapp', 'feira', 'empresas'])[1 + floor(random() * 5)::int],
  (array['Centro', 'Zona Norte', 'Zona Sul', 'Zona Leste', 'Zona Oeste'])[1 + floor(random() * 5)::int],
  (array['cestas', 'cestas', 'frutas', 'verduras', 'legumes'])[1 + floor(random() * 5)::int],
  -- valor base R$ 60–200 com tendência de crescimento ao longo do ano
  round(((60 + random() * 140) * (0.85 + (d::date - (current_date - 365)) / 365.0 * 0.4))::numeric, 2),
  random() < 0.22
from generate_series(current_date - 364, current_date, interval '1 day') as d
cross join lateral generate_series(
  1,
  -- 4 a 9 pedidos por dia, +3 às sextas e sábados
  (4 + floor(random() * 6) + case when extract(isodow from d) in (5, 6) then 3 else 0 end)::int
) as n;

-- Leads de exemplo (fictícios, e-mails em domínio reservado example.com)
insert into public.leads (nome, email, telefone, interesse, mensagem, origem, consentimento_lgpd, created_at)
values
  ('Ana Exemplo', 'ana@example.com', '(11) 90000-0001', 'cesta_semanal', 'Entregam no Centro?', 'site', true, now() - interval '2 days'),
  ('Bruno Teste', 'bruno@example.com', null, 'empresas', 'Cestas para 40 colaboradores.', 'site', true, now() - interval '5 days'),
  ('Carla Demo', 'carla@example.com', '(11) 90000-0003', 'cesta_quinzenal', null, 'site', true, now() - interval '9 days');

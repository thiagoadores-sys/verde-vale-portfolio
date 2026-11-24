# Verde Vale Orgânicos — projeto de portfólio 

> **Projeto fictício.** Empresa, preços, depoimentos e números de vendas são inventados para demonstração.

Landing page de uma empresa de cestas de orgânicos por assinatura, com formulário de leads gravando no Supabase, painel de vendas com KPIs e área restrita do administrador.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · Supabase (Postgres, Auth, RLS) · Vercel · GitHub Actions

## O que o projeto demonstra

| Página | O que mostra |
|---|---|
| `/` | Landing page mobile-first: proposta de valor, como funciona, planos, prova social, formulário com consentimento LGPD |
| `/painel` | Dashboard público com dados fictícios: 4 KPIs com comparação, tendência de 12 meses com meta, receita por canal e categoria, tabela mensal |
| `/painel/leads` | Área do administrador (login + RLS): lista dos leads recebidos |
| `/politica-de-privacidade` | Modelo de política LGPD |

Destaques técnicos:
- **Segurança no banco**: Row Level Security em todas as tabelas. O visitante só *insere* leads (e só com consentimento); apenas admins leem.
- **Views de KPI** com `security_invoker`, então as regras de acesso valem também nos indicadores.
- **Gráficos sem bibliotecas** (SVG/HTML), acessíveis e leves.
- **Seed determinístico**: 12 meses de pedidos sempre relativos à data atual, então o painel nunca fica “velho”.
- **Acessibilidade**: HTML semântico, contraste AA, foco visível, link “pular para o conteúdo”, tabelas para leitores de tela.

## Premissas assumidas

- Empresa fictícia **Verde Vale Orgânicos**, segmento varejo/alimentos (sem regras de conselho profissional).
- Paleta própria: verde `#2F6B3A`, laranja `#E07A1F`, fundo `#FAF8F2`; fontes Fraunces + Inter (Google Fonts, licença aberta).
- O painel de vendas é **público** porque os dados são fictícios. Em cliente real, troque a política de `pedidos` para só admins.
- Meta mensal fictícia de R$ 36.000 em `lib/config.ts`.

## Rodar localmente

Pré-requisitos: Node 20+, Docker (para o Supabase local) e [Supabase CLI](https://supabase.com/docs/guides/cli).

```bash
npm install                 # gera o package-lock.json — commite-o
supabase start              # sobe o banco local e mostra URL + chave publishable
supabase db reset           # aplica a migration e o seed fictício
cp .env.example .env.local  # cole a URL e a chave mostradas pelo `supabase start`
npm run dev                 # http://localhost:3000
```

### Criar o usuário administrador

1. No Supabase Studio (local: http://127.0.0.1:54323, ou painel do projeto remoto) → **Authentication → Users → Add user**, com e-mail e senha.
2. No **SQL Editor**, promova a admin:

```sql
update public.perfis set is_admin = true
where id = (select id from auth.users where email = 'SEU-EMAIL-AQUI');
```

3. Entre em `/login` e acesse `/painel/leads`.

## Publicar (GitHub + Supabase + Vercel)

Resumo (detalhes na skill `deploy-github-vercel-supabase`):

```bash
git init -b main && git add . && git commit -m "chore: estrutura inicial"
gh repo create <seu-usuario>/verde-vale-portfolio --public --source=. --push   # público para portfólio

supabase link --project-ref <project-ref>
supabase db push --include-seed        # migration + dados fictícios no projeto remoto
npm run db:types                       # regenera lib/database.types.ts

# Vercel: importe o repositório no painel (Add New → Project) e cadastre:
# NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, NEXT_PUBLIC_SITE_URL
```

No Supabase remoto, em **Authentication**: desative cadastros públicos (*Allow new users to sign up*) e configure Site URL / Redirect URLs com o endereço da Vercel.

## Estrutura

```
app/                 páginas, server actions, sitemap e robots
components/          formulário, banner de cookies, cabeçalho, componentes do painel
lib/                 clientes Supabase, tipos, formatação e configurações da marca
supabase/            config, migration (schema + RLS + views) e seed fictício
docs/                especificação do dashboard (KPIs, fórmulas, layout)
.github/workflows/   CI: checagem de tipos e build a cada push/PR
```

## Pendências (se virar cliente real)

- [INSERIR RAZÃO SOCIAL, CNPJ, ENDEREÇO] e prazo de retenção na Política de Privacidade
- [INSERIR LOGO] oficial e fotos próprias/licenciadas
- [INSERIR DEPOIMENTO REAL] no lugar dos depoimentos ilustrativos
- Restringir a leitura de `pedidos` a admins
- Notificação por e-mail a cada novo lead (próxima iteração sugerida)

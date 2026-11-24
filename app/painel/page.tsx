import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { META_RECEITA_MENSAL, rotulos } from '@/lib/config'
import { fmtInteiro, fmtMes, fmtMoeda, fmtMoedaCurta, fmtVariacao } from '@/lib/format'
import { KpiCard } from '@/components/painel/KpiCard'
import { LineChart } from '@/components/painel/LineChart'
import { BarList } from '@/components/painel/BarList'

export const metadata: Metadata = {
  title: 'Painel de vendas (demo)',
  description: 'Dashboard de demonstração com dados fictícios: receita, pedidos, ticket médio e canais.',
}

// Primeiro dia do mês atual no fuso de São Paulo, ex.: "2026-11-01"
function inicioMesAtual() {
  const partes = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit' })
    .format(new Date())
  return `${partes.slice(0, 7)}-01`
}

type Kpi = { mes: string; pedidos: number; receita: number; ticket_medio: number; clientes_novos: number }

export default async function PainelPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('kpi_mensal').select('*').order('mes', { ascending: true })

  if (error || !data) {
    return <Aviso texto="Não foi possível carregar os dados. Verifique as variáveis do Supabase e se as migrations foram aplicadas." />
  }

  const linhas: Kpi[] = data
    .filter((d) => d.mes !== null)
    .map((d) => ({
      mes: d.mes as string,
      pedidos: Number(d.pedidos ?? 0),
      receita: Number(d.receita ?? 0),
      ticket_medio: Number(d.ticket_medio ?? 0),
      clientes_novos: Number(d.clientes_novos ?? 0),
    }))
  const mesAtual = inicioMesAtual()
  const completos = linhas.filter((d) => d.mes < mesAtual).slice(-12)
  const parcial = linhas.find((d) => d.mes === mesAtual)

  if (completos.length < 2) {
    return <Aviso texto="Ainda não há dois meses completos de dados. Rode o seed (supabase db push --include-seed)." />
  }

  const ref = completos[completos.length - 1]
  const ant = completos[completos.length - 2]

  const [canais, categorias] = await Promise.all([
    supabase.from('vendas_mes_canal').select('*').in('mes', [ref.mes, ant.mes]),
    supabase.from('vendas_mes_categoria').select('*').in('mes', [ref.mes, ant.mes]),
  ])

  // Soma a receita por chave, separando mês de referência e mês anterior
  function agrupar(linhas: { chave: string | null; mes: string | null; receita: number | null }[]) {
    const mapa = new Map<string, { valor: number; anterior: number }>()
    for (const l of linhas) {
      const k = l.chave ?? 'outro'
      const item = mapa.get(k) ?? { valor: 0, anterior: 0 }
      if (l.mes === ref.mes) item.valor += Number(l.receita ?? 0)
      else item.anterior += Number(l.receita ?? 0)
      mapa.set(k, item)
    }
    return [...mapa.entries()]
      .map(([k, v]) => ({ rotulo: rotulos[k] ?? k, ...v }))
      .sort((a, b) => b.valor - a.valor)
  }

  const porCanal = agrupar((canais.data ?? []).map((l) => ({ ...l, chave: l.canal })))
  const porCategoria = agrupar((categorias.data ?? []).map((l) => ({ ...l, chave: l.categoria })))
  const pctMeta = Math.round((ref.receita / META_RECEITA_MENSAL) * 100)
  const vsAnt = `vs ${fmtMes(ant.mes)}`

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-xl border border-destaque/60 bg-destaque/10 px-4 py-3 text-sm">
        <strong>Demonstração:</strong> todos os números deste painel são fictícios, gerados para portfólio.
      </div>

      <header className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-marca-escura">Painel de vendas</h1>
          <p className="text-texto-suave">
            Referência: <strong>{fmtMes(ref.mes, true)}</strong> (último mês fechado), comparado com {fmtMes(ant.mes, true)}.
          </p>
        </div>
        <Link href="/painel/leads" className="text-sm font-medium text-marca underline">Ver leads (admin) →</Link>
      </header>

      {/* 1. KPIs principais */}
      <section aria-label="Indicadores principais" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          titulo="Receita do mês"
          valor={fmtMoeda(ref.receita)}
          comparacao={`${fmtVariacao(ref.receita, ant.receita)} ${vsAnt}`}
          positivo={ref.receita >= ant.receita}
          detalhe={`Meta ${fmtMoeda(META_RECEITA_MENSAL)} · ${pctMeta}% atingido`}
        />
        <KpiCard
          titulo="Pedidos"
          valor={fmtInteiro(ref.pedidos)}
          comparacao={`${fmtVariacao(ref.pedidos, ant.pedidos)} ${vsAnt}`}
          positivo={ref.pedidos >= ant.pedidos}
        />
        <KpiCard
          titulo="Ticket médio"
          valor={fmtMoeda(ref.ticket_medio)}
          comparacao={`${fmtVariacao(ref.ticket_medio, ant.ticket_medio)} ${vsAnt}`}
          positivo={ref.ticket_medio >= ant.ticket_medio}
        />
        <KpiCard
          titulo="Pedidos de clientes novos"
          valor={fmtInteiro(ref.clientes_novos)}
          comparacao={`${fmtVariacao(ref.clientes_novos, ant.clientes_novos)} ${vsAnt}`}
          positivo={ref.clientes_novos >= ant.clientes_novos}
          detalhe={`${Math.round((ref.clientes_novos / ref.pedidos) * 100)}% dos pedidos`}
        />
      </section>

      {/* 2. Tendência */}
      <section aria-labelledby="t-tendencia" className="mt-8 rounded-2xl border border-borda bg-white p-6">
        <h2 id="t-tendencia" className="text-xl font-semibold">Receita mensal — últimos {completos.length} meses</h2>
        <p className="text-sm text-texto-suave">A linha tracejada é a meta mensal.</p>
        <div className="mt-4">
          <LineChart
            titulo="Receita mensal comparada à meta"
            dados={completos.map((d) => ({ rotulo: fmtMes(d.mes), valor: d.receita }))}
            meta={META_RECEITA_MENSAL}
            formatar={fmtMoeda}
            formatarEixo={fmtMoedaCurta}
          />
        </div>
        {parcial && (
          <p className="mt-2 text-sm text-texto-suave">
            Mês atual (parcial, {fmtMes(parcial.mes, true)}): {fmtMoeda(parcial.receita)} em {fmtInteiro(parcial.pedidos)} pedidos.
          </p>
        )}
      </section>

      {/* 3. Composição */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section aria-labelledby="t-canal" className="rounded-2xl border border-borda bg-white p-6">
          <h2 id="t-canal" className="text-xl font-semibold">Receita por canal</h2>
          <p className="mb-4 text-sm text-texto-suave">{fmtMes(ref.mes, true)} · participação · variação {vsAnt}</p>
          <BarList dados={porCanal} formatar={fmtMoeda} formatarVariacao={fmtVariacao} />
        </section>
        <section aria-labelledby="t-cat" className="rounded-2xl border border-borda bg-white p-6">
          <h2 id="t-cat" className="text-xl font-semibold">Receita por categoria</h2>
          <p className="mb-4 text-sm text-texto-suave">{fmtMes(ref.mes, true)} · participação · variação {vsAnt}</p>
          <BarList dados={porCategoria} formatar={fmtMoeda} formatarVariacao={fmtVariacao} />
        </section>
      </div>

      {/* 4. Detalhe */}
      <section aria-labelledby="t-tabela" className="mt-8 rounded-2xl border border-borda bg-white p-6">
        <h2 id="t-tabela" className="text-xl font-semibold">Resultados mês a mês</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm tabular-nums">
            <thead className="border-b border-borda text-left text-texto-suave">
              <tr>
                <th scope="col" className="py-2 pr-4 font-medium">Mês</th>
                <th scope="col" className="py-2 pr-4 text-right font-medium">Receita</th>
                <th scope="col" className="py-2 pr-4 text-right font-medium">% da meta</th>
                <th scope="col" className="py-2 pr-4 text-right font-medium">Pedidos</th>
                <th scope="col" className="py-2 pr-4 text-right font-medium">Ticket médio</th>
                <th scope="col" className="py-2 text-right font-medium">Clientes novos</th>
              </tr>
            </thead>
            <tbody>
              {[...completos].reverse().map((d) => (
                <tr key={d.mes} className="border-b border-borda/60">
                  <th scope="row" className="py-2 pr-4 text-left font-medium">{fmtMes(d.mes, true)}</th>
                  <td className="py-2 pr-4 text-right">{fmtMoeda(d.receita)}</td>
                  <td className={`py-2 pr-4 text-right ${d.receita >= META_RECEITA_MENSAL ? 'text-marca font-semibold' : ''}`}>
                    {Math.round((d.receita / META_RECEITA_MENSAL) * 100)}%
                  </td>
                  <td className="py-2 pr-4 text-right">{fmtInteiro(d.pedidos)}</td>
                  <td className="py-2 pr-4 text-right">{fmtMoeda(d.ticket_medio)}</td>
                  <td className="py-2 text-right">{fmtInteiro(d.clientes_novos)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function Aviso({ texto }: { texto: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-semibold text-marca-escura">Painel de vendas</h1>
      <p role="alert" className="mt-4 rounded-xl border border-borda bg-white p-4">{texto}</p>
    </div>
  )
}

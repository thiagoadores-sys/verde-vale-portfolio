const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const moedaCurta = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  notation: 'compact',
  maximumFractionDigits: 1,
})
const inteiro = new Intl.NumberFormat('pt-BR')
const pct = new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 1, signDisplay: 'exceptZero' })

export const fmtMoeda = (v: number) => moeda.format(v)
export const fmtMoedaCurta = (v: number) => moedaCurta.format(v)
export const fmtInteiro = (v: number) => inteiro.format(v)
export const fmtVariacao = (atual: number, anterior: number) =>
  anterior ? pct.format((atual - anterior) / anterior) : '—'

// "2026-10-01" -> "out/26" (sem depender do fuso horário)
const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
export function fmtMes(iso: string, longo = false) {
  const [ano, mes] = iso.split('-').map(Number)
  const nome = MESES[mes - 1]
  return longo ? `${nome}/${ano}` : `${nome}/${String(ano).slice(2)}`
}

export function fmtDataHora(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  })
}

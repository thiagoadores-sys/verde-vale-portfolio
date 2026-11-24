type Props = {
  titulo: string
  valor: string
  comparacao: string   // ex.: "+8,2% vs set/26"
  positivo?: boolean   // define a cor da comparação
  detalhe?: string     // ex.: "Meta: R$ 36.000 (97%)"
}

export function KpiCard({ titulo, valor, comparacao, positivo, detalhe }: Props) {
  const cor = positivo === undefined ? 'text-texto-suave' : positivo ? 'text-marca' : 'text-red-700'
  const seta = positivo === undefined ? '' : positivo ? '▲ ' : '▼ '
  return (
    <div className="rounded-2xl border border-borda bg-white p-5">
      <p className="text-sm text-texto-suave">{titulo}</p>
      <p className="mt-1 text-3xl font-semibold tabular-nums">{valor}</p>
      <p className={`mt-1 text-sm font-medium ${cor}`}>
        {seta && <span aria-hidden="true">{seta}</span>}
        {comparacao}
      </p>
      {detalhe && <p className="mt-1 text-xs text-texto-suave">{detalhe}</p>}
    </div>
  )
}

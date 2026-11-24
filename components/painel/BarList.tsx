// Barras horizontais em HTML: rótulos legíveis e acessíveis por padrão.
type Item = { rotulo: string; valor: number; anterior?: number }

type Props = {
  dados: Item[]
  formatar: (v: number) => string
  formatarVariacao?: (atual: number, anterior: number) => string
}

export function BarList({ dados, formatar, formatarVariacao }: Props) {
  const total = dados.reduce((s, d) => s + d.valor, 0)
  const max = Math.max(...dados.map((d) => d.valor), 1)
  return (
    <ul className="space-y-3">
      {dados.map((d) => (
        <li key={d.rotulo}>
          <div className="flex items-baseline justify-between gap-2 text-sm">
            <span className="font-medium">{d.rotulo}</span>
            <span className="tabular-nums">
              {formatar(d.valor)}
              <span className="text-texto-suave"> · {total ? Math.round((d.valor / total) * 100) : 0}%</span>
              {formatarVariacao && d.anterior !== undefined && (
                <span className="text-texto-suave"> · {formatarVariacao(d.valor, d.anterior)}</span>
              )}
            </span>
          </div>
          <div className="mt-1 h-3 rounded-full bg-suave" aria-hidden="true">
            <div className="h-3 rounded-full bg-marca" style={{ width: `${(d.valor / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

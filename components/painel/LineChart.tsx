// Gráfico de linha em SVG puro (sem bibliotecas), com linha de meta
// e tabela oculta para leitores de tela.
type Ponto = { rotulo: string; valor: number }

type Props = {
  titulo: string
  dados: Ponto[]
  meta?: number
  formatar: (v: number) => string
  formatarEixo: (v: number) => string
}

const L = 640
const A = 260
const M = { topo: 16, dir: 16, base: 32, esq: 64 }

export function LineChart({ titulo, dados, meta, formatar, formatarEixo }: Props) {
  if (dados.length === 0) return <p className="text-texto-suave">Sem dados no período.</p>

  const maxDados = Math.max(...dados.map((d) => d.valor), meta ?? 0)
  const max = Math.ceil((maxDados * 1.1) / 5000) * 5000
  const largura = L - M.esq - M.dir
  const altura = A - M.topo - M.base
  const x = (i: number) => M.esq + (dados.length === 1 ? largura / 2 : (i / (dados.length - 1)) * largura)
  const y = (v: number) => M.topo + altura - (v / max) * altura
  const linha = dados.map((d, i) => `${i ? 'L' : 'M'}${x(i)},${y(d.valor)}`).join(' ')
  const area = `${linha} L${x(dados.length - 1)},${M.topo + altura} L${x(0)},${M.topo + altura} Z`
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * max)

  return (
    <figure>
      <svg viewBox={`0 0 ${L} ${A}`} className="w-full h-auto" role="img" aria-label={titulo}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={M.esq} x2={L - M.dir} y1={y(t)} y2={y(t)} stroke="var(--cor-borda)" />
            <text x={M.esq - 8} y={y(t) + 4} textAnchor="end" fontSize="12" fill="var(--cor-texto-suave)">
              {formatarEixo(t)}
            </text>
          </g>
        ))}
        {dados.map((d, i) => (
          <text key={d.rotulo} x={x(i)} y={A - 10} textAnchor="middle" fontSize="12" fill="var(--cor-texto-suave)">
            {d.rotulo}
          </text>
        ))}
        <path d={area} fill="var(--cor-primaria)" opacity="0.08" />
        <path d={linha} fill="none" stroke="var(--cor-primaria)" strokeWidth="3" strokeLinejoin="round" />
        {dados.map((d, i) => (
          <circle key={d.rotulo} cx={x(i)} cy={y(d.valor)} r="4" fill="var(--cor-primaria)">
            <title>{`${d.rotulo}: ${formatar(d.valor)}`}</title>
          </circle>
        ))}
        {meta !== undefined && (
          <g>
            <line x1={M.esq} x2={L - M.dir} y1={y(meta)} y2={y(meta)} stroke="var(--cor-secundaria)" strokeWidth="2" strokeDasharray="6 4" />
            <text x={L - M.dir} y={y(meta) - 6} textAnchor="end" fontSize="12" fontWeight="600" fill="#9a4f0c">
              Meta {formatarEixo(meta)}
            </text>
          </g>
        )}
      </svg>
      <table className="sr-only">
        <caption>{titulo}</caption>
        <thead><tr><th scope="col">Mês</th><th scope="col">Valor</th></tr></thead>
        <tbody>
          {dados.map((d) => (
            <tr key={d.rotulo}><td>{d.rotulo}</td><td>{formatar(d.valor)}</td></tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}

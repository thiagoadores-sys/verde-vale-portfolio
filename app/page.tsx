import Link from 'next/link'
import { LeadForm } from '@/components/LeadForm'

const passos = [
  { titulo: 'Escolha sua cesta', texto: 'Semanal ou quinzenal, no tamanho da sua casa.' },
  { titulo: 'Colhemos na véspera', texto: 'Produtores parceiros a menos de 100 km da cidade.' },
  { titulo: 'Receba em casa', texto: 'Entrega com embalagem retornável, sem plástico descartável.' },
]

// Preços ilustrativos (empresa fictícia)
const cestas = [
  { nome: 'Pequena', pessoas: '1–2 pessoas', preco: 'R$ 89', itens: '10 a 12 itens', destaque: false },
  { nome: 'Família', pessoas: '3–4 pessoas', preco: 'R$ 139', itens: '16 a 18 itens', destaque: true },
  { nome: 'Grande', pessoas: '5+ pessoas', preco: 'R$ 189', itens: '22 a 25 itens', destaque: false },
]

const depoimentos = [
  { texto: 'As verduras duram a semana inteira. Nunca mais voltei ao mercado para isso.', autor: 'Cliente ilustrativa, Zona Sul' },
  { texto: 'Assinamos para o escritório e a equipe adora a cesta de frutas.', autor: 'Empresa ilustrativa, Centro' },
]

export default function Home() {
  return (
    <>
      {/* Hero: proposta de valor + CTA acima da dobra */}
      <section className="bg-suave">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-marca">Orgânicos por assinatura</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-marca-escura md:text-5xl">
              Do produtor para a sua mesa em menos de 24 horas
            </h1>
            <p className="mt-4 max-w-prose text-lg text-texto-suave">
              Cestas de frutas, verduras e legumes orgânicos, colhidos na véspera e entregues na sua porta toda semana.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#contato" className="rounded-full bg-marca px-6 py-3 font-semibold text-white hover:bg-marca-escura">
                Quero minha cesta
              </Link>
              <Link href="#cestas" className="rounded-full border border-marca px-6 py-3 font-semibold text-marca hover:bg-white">
                Ver tamanhos e preços
              </Link>
            </div>
          </div>
          <Ilustracao />
        </div>
      </section>

      <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="titulo-como">
        <h2 id="titulo-como" className="text-3xl font-semibold text-marca-escura">Como funciona</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {passos.map((p, i) => (
            <li key={p.titulo} className="rounded-2xl border border-borda bg-white p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-destaque font-bold text-texto" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{p.titulo}</h3>
              <p className="mt-2 text-texto-suave">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="cestas" className="bg-suave" aria-labelledby="titulo-cestas">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 id="titulo-cestas" className="text-3xl font-semibold text-marca-escura">Escolha o tamanho</h2>
          <p className="mt-2 text-texto-suave">Valores por entrega. Frete grátis na área de cobertura.</p>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {cestas.map((c) => (
              <li
                key={c.nome}
                className={`rounded-2xl bg-white p-6 ${c.destaque ? 'border-2 border-marca shadow-md' : 'border border-borda'}`}
              >
                {c.destaque && (
                  <span className="inline-block rounded-full bg-destaque px-3 py-1 text-xs font-semibold text-texto">Mais escolhida</span>
                )}
                <h3 className="mt-2 text-2xl font-semibold">{c.nome}</h3>
                <p className="text-texto-suave">{c.pessoas} · {c.itens}</p>
                <p className="mt-4 text-3xl font-bold text-marca-escura">{c.preco}</p>
                <Link href="#contato" className="mt-6 block rounded-full bg-marca px-4 py-2 text-center font-medium text-white hover:bg-marca-escura">
                  Escolher {c.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="titulo-depo">
        <h2 id="titulo-depo" className="text-3xl font-semibold text-marca-escura">Quem assina, recomenda</h2>
        <p className="mt-1 text-sm text-texto-suave">Depoimentos ilustrativos — projeto fictício.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="rounded-2xl border border-borda bg-white p-6">
              <blockquote className="text-lg">“{d.texto}”</blockquote>
              <figcaption className="mt-3 text-sm text-texto-suave">— {d.autor}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="contato" className="bg-suave" aria-labelledby="titulo-contato">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <h2 id="titulo-contato" className="text-3xl font-semibold text-marca-escura">Peça sua primeira cesta</h2>
            <p className="mt-3 text-texto-suave">
              Deixe seu contato e confirmamos a entrega no seu bairro. Sem fidelidade: pause ou cancele quando quiser.
            </p>
            <ul className="mt-6 space-y-2 text-texto-suave">
              <li>✓ Resposta em até 1 dia útil</li>
              <li>✓ Primeira entrega já na próxima semana</li>
              <li>✓ Planos para empresas</li>
            </ul>
          </div>
          <LeadForm />
        </div>
      </section>
    </>
  )
}

function Ilustracao() {
  return (
    <svg viewBox="0 0 400 320" className="w-full max-w-md justify-self-center" role="img" aria-label="Ilustração de uma cesta com verduras e frutas">
      <ellipse cx="200" cy="290" rx="150" ry="18" fill="var(--cor-borda)" />
      <circle cx="150" cy="140" r="46" fill="var(--cor-secundaria)" />
      <circle cx="245" cy="130" r="40" fill="#c0392b" />
      <path d="M120 150c-10-60 30-100 70-110-5 50-25 90-70 110z" fill="var(--cor-primaria)" />
      <path d="M270 150c20-55 0-95-35-115 0 50 10 90 35 115z" fill="#4f8f5a" />
      <path d="M70 170h260l-30 115H100z" fill="#b5835a" />
      <path d="M85 200h230M95 235h210M105 265h190" stroke="#8a5f3c" strokeWidth="6" />
    </svg>
  )
}

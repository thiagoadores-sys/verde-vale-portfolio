import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold text-marca-escura">Página não encontrada</h1>
      <p className="mt-3 text-texto-suave">O endereço pode ter mudado ou não existe.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-marca px-6 py-3 font-semibold text-white">Voltar ao início</Link>
    </div>
  )
}

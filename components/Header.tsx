import Link from 'next/link'
import { marca } from '@/lib/config'
import { Logo } from './Logo'

export function Header() {
  return (
    <header className="border-b border-borda bg-fundo/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-titulo text-lg font-semibold text-marca-escura">
          <Logo />
          <span>{marca.nome}</span>
        </Link>
        <nav aria-label="Principal">
          <ul className="flex items-center gap-1 sm:gap-4 text-sm">
            <li className="hidden md:block">
              <Link href="/#como-funciona" className="px-2 py-2 hover:text-marca">Como funciona</Link>
            </li>
            <li className="hidden md:block">
              <Link href="/#cestas" className="px-2 py-2 hover:text-marca">Cestas</Link>
            </li>
            <li>
              <Link href="/painel" className="px-2 py-2 hover:text-marca">Painel demo</Link>
            </li>
            <li>
              <Link
                href="/#contato"
                className="inline-block rounded-full bg-marca px-4 py-2 font-medium text-white hover:bg-marca-escura"
              >
                Quero minha cesta
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

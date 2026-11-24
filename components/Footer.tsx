import Link from 'next/link'
import { marca } from '@/lib/config'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-borda bg-suave">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 sm:grid-cols-3 text-sm text-texto-suave">
        <div>
          <p className="font-titulo text-base font-semibold text-texto">{marca.nome}</p>
          <p className="mt-1">{marca.slogan}</p>
        </div>
        <div>
          <p className="font-semibold text-texto">Contato</p>
          <p className="mt-1">WhatsApp {marca.whatsapp}</p>
          <p>{marca.email}</p>
        </div>
        <div>
          <p className="font-semibold text-texto">Links</p>
          <ul className="mt-1 space-y-1">
            <li><Link href="/politica-de-privacidade" className="underline hover:text-marca">Política de Privacidade</Link></li>
            <li><Link href="/painel" className="underline hover:text-marca">Painel de vendas (demo)</Link></li>
            <li><Link href="/login" className="underline hover:text-marca">Área do administrador</Link></li>
          </ul>
        </div>
      </div>
      <p className="border-t border-borda py-4 text-center text-xs text-texto-suave px-4">
        Projeto fictício criado para portfólio. Empresa, preços, depoimentos e números são ilustrativos.
      </p>
    </footer>
  )
}

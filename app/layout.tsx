import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'
import { CookieBanner } from '@/components/CookieBanner'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { marca, siteUrl } from '@/lib/config'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${marca.nome} — cestas de orgânicos por assinatura`,
    template: `%s | ${marca.nome}`,
  },
  description:
    'Cestas de frutas, verduras e legumes orgânicos de produtores locais, entregues em casa toda semana. Projeto fictício de portfólio.',
  openGraph: { type: 'website', locale: 'pt_BR', siteName: marca.nome },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-4 focus:py-2"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}

'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const CHAVE = 'vv-cookies'

// Este site usa apenas cookies essenciais (sessão do login).
// Se analytics for adicionado, carregue-o só quando a escolha for "todos".
export function CookieBanner() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(CHAVE)) setVisivel(true)
    } catch {
      setVisivel(true)
    }
  }, [])

  function escolher(valor: 'essenciais' | 'todos') {
    try {
      localStorage.setItem(CHAVE, valor)
    } catch {
      /* armazenamento indisponível: só fecha o aviso */
    }
    setVisivel(false)
  }

  if (!visivel) return null

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-borda bg-white p-4 shadow-lg"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          Usamos cookies essenciais para o site funcionar. Saiba mais na{' '}
          <Link href="/politica-de-privacidade" className="underline text-marca">Política de Privacidade</Link>.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => escolher('essenciais')}
            className="rounded-full border border-marca px-4 py-2 text-sm font-medium text-marca hover:bg-suave"
          >
            Só essenciais
          </button>
          <button
            type="button"
            onClick={() => escolher('todos')}
            className="rounded-full bg-marca px-4 py-2 text-sm font-medium text-white hover:bg-marca-escura"
          >
            Aceitar todos
          </button>
        </div>
      </div>
    </div>
  )
}

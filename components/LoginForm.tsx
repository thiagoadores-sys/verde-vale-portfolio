'use client'
import { useActionState } from 'react'
import { entrar, type EstadoLogin } from '@/app/actions/auth'

const campo = 'mt-1 block w-full rounded-lg border border-borda bg-white px-3 py-2 focus:border-marca'

export function LoginForm() {
  const [estado, acao, enviando] = useActionState<EstadoLogin, FormData>(entrar, null)
  return (
    <form action={acao} className="grid gap-4 rounded-2xl border border-borda bg-white p-6">
      <div>
        <label htmlFor="email" className="text-sm font-medium">E-mail</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={campo} />
      </div>
      <div>
        <label htmlFor="senha" className="text-sm font-medium">Senha</label>
        <input id="senha" name="senha" type="password" required autoComplete="current-password" className={campo} />
      </div>
      <p aria-live="polite" className="min-h-5 text-sm font-medium text-red-700">{estado?.erro ?? ''}</p>
      <button
        type="submit"
        disabled={enviando}
        className="rounded-full bg-marca px-6 py-3 font-semibold text-white hover:bg-marca-escura disabled:opacity-60"
      >
        {enviando ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  )
}

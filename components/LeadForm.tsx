'use client'
import Link from 'next/link'
import { useActionState } from 'react'
import { enviarLead, type EstadoLead } from '@/app/actions/leads'

const campo =
  'mt-1 block w-full rounded-lg border border-borda bg-white px-3 py-2 text-texto placeholder:text-texto-suave/70 focus:border-marca'

export function LeadForm() {
  const [estado, acao, enviando] = useActionState<EstadoLead, FormData>(enviarLead, null)

  if (estado?.ok) {
    return (
      <div role="status" className="rounded-2xl border border-marca bg-suave p-6 text-center">
        <p className="font-titulo text-xl text-marca-escura">Obrigado!</p>
        <p className="mt-2">{estado.mensagem}</p>
      </div>
    )
  }

  return (
    <form action={acao} className="grid gap-4 rounded-2xl border border-borda bg-white p-6 shadow-sm" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="text-sm font-medium">Nome *</label>
          <input id="nome" name="nome" required autoComplete="name" maxLength={120} className={campo} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">E-mail *</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={campo} />
        </div>
        <div>
          <label htmlFor="telefone" className="text-sm font-medium">WhatsApp (opcional)</label>
          <input id="telefone" name="telefone" type="tel" autoComplete="tel" maxLength={30} className={campo} />
        </div>
        <div>
          <label htmlFor="interesse" className="text-sm font-medium">Interesse</label>
          <select id="interesse" name="interesse" defaultValue="cesta_semanal" className={campo}>
            <option value="cesta_semanal">Cesta semanal</option>
            <option value="cesta_quinzenal">Cesta quinzenal</option>
            <option value="empresas">Cestas para empresas</option>
            <option value="outro">Outro assunto</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="mensagem" className="text-sm font-medium">Mensagem (opcional)</label>
        <textarea id="mensagem" name="mensagem" rows={3} maxLength={2000} className={campo} />
      </div>

      {/* honeypot: escondido de pessoas e leitores de tela */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="site">Não preencha</label>
        <input id="site" name="site" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-start gap-2">
        <input id="consentimento" name="consentimento" type="checkbox" required className="mt-1 h-4 w-4 accent-[var(--cor-primaria)]" />
        <label htmlFor="consentimento" className="text-sm text-texto-suave">
          Concordo com o uso dos meus dados para receber o contato da Verde Vale, conforme a{' '}
          <Link href="/politica-de-privacidade" className="underline text-marca">Política de Privacidade</Link>. *
        </label>
      </div>

      <p aria-live="polite" className="min-h-5 text-sm font-medium text-red-700">
        {estado && !estado.ok ? estado.mensagem : ''}
      </p>

      <button
        type="submit"
        disabled={enviando}
        className="rounded-full bg-marca px-6 py-3 font-semibold text-white hover:bg-marca-escura disabled:opacity-60"
      >
        {enviando ? 'Enviando…' : 'Quero receber minha primeira cesta'}
      </button>
    </form>
  )
}

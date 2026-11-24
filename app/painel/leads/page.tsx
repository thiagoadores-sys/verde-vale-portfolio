import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { sair } from '@/app/actions/auth'
import { rotulos } from '@/lib/config'
import { fmtDataHora } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Leads',
  robots: { index: false, follow: false },
}

export default async function LeadsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: admin } = await supabase.rpc('is_admin')

  if (!admin) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-semibold text-marca-escura">Acesso restrito</h1>
        <p className="mt-3">Sua conta ({user.email}) não tem permissão de administrador.</p>
        <form action={sair} className="mt-6">
          <button className="rounded-full border border-marca px-4 py-2 text-marca">Sair</button>
        </form>
      </div>
    )
  }

  // O RLS garante no banco que só administradores leem esta tabela
  const { data: leads, error } = await supabase
    .from('leads')
    .select('id, created_at, nome, email, telefone, interesse, mensagem')
    .order('created_at', { ascending: false })
    .limit(200)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-marca-escura">Leads do site</h1>
          <p className="text-texto-suave">{leads?.length ?? 0} contatos mais recentes · todos com consentimento LGPD registrado</p>
        </div>
        <form action={sair}>
          <button className="rounded-full border border-marca px-4 py-2 text-sm font-medium text-marca hover:bg-suave">Sair</button>
        </form>
      </header>

      {error && <p role="alert" className="mt-6 text-red-700">Erro ao carregar os leads.</p>}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-borda bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-borda bg-suave text-left">
            <tr>
              <th scope="col" className="p-3 font-medium">Recebido em</th>
              <th scope="col" className="p-3 font-medium">Nome</th>
              <th scope="col" className="p-3 font-medium">Contato</th>
              <th scope="col" className="p-3 font-medium">Interesse</th>
              <th scope="col" className="p-3 font-medium">Mensagem</th>
            </tr>
          </thead>
          <tbody>
            {(leads ?? []).map((l) => (
              <tr key={l.id} className="border-b border-borda/60 align-top">
                <td className="p-3 whitespace-nowrap tabular-nums">{fmtDataHora(l.created_at)}</td>
                <td className="p-3 font-medium">{l.nome}</td>
                <td className="p-3">
                  <a href={`mailto:${l.email}`} className="text-marca underline">{l.email}</a>
                  {l.telefone && <div className="text-texto-suave">{l.telefone}</div>}
                </td>
                <td className="p-3">{rotulos[l.interesse] ?? l.interesse}</td>
                <td className="p-3 max-w-xs text-texto-suave">{l.mensagem ?? '—'}</td>
              </tr>
            ))}
            {leads?.length === 0 && (
              <tr><td colSpan={5} className="p-6 text-center text-texto-suave">Nenhum lead ainda.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

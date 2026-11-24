'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type EstadoLogin = { erro: string } | null

export async function entrar(_: EstadoLogin, form: FormData): Promise<EstadoLogin> {
  const email = String(form.get('email') ?? '').trim()
  const password = String(form.get('senha') ?? '')
  if (!email || !password) return { erro: 'Informe e-mail e senha.' }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { erro: 'E-mail ou senha inválidos.' }

  redirect('/painel/leads')
}

export async function sair() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

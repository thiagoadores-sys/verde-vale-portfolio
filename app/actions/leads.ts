'use server'
import { createClient } from '@/lib/supabase/server'

export type EstadoLead = { ok: boolean; mensagem: string } | null

const INTERESSES = ['cesta_semanal', 'cesta_quinzenal', 'empresas', 'outro']

export async function enviarLead(_: EstadoLead, form: FormData): Promise<EstadoLead> {
  // honeypot anti-spam: campo invisível que humanos não preenchem
  if (String(form.get('site') ?? '')) return { ok: true, mensagem: 'Recebemos seu contato!' }

  const nome = String(form.get('nome') ?? '').trim()
  const email = String(form.get('email') ?? '').trim().toLowerCase()
  const telefone = String(form.get('telefone') ?? '').trim()
  const mensagem = String(form.get('mensagem') ?? '').trim()
  const interesse = String(form.get('interesse') ?? 'outro')

  if (form.get('consentimento') !== 'on') {
    return { ok: false, mensagem: 'Para enviar, aceite a Política de Privacidade.' }
  }
  if (nome.length < 2 || nome.length > 120) {
    return { ok: false, mensagem: 'Informe seu nome.' }
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, mensagem: 'Informe um e-mail válido.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('leads').insert({
    nome,
    email,
    telefone: telefone ? telefone.slice(0, 30) : null,
    mensagem: mensagem ? mensagem.slice(0, 2000) : null,
    interesse: INTERESSES.includes(interesse) ? interesse : 'outro',
    origem: 'site',
    consentimento_lgpd: true,
  })

  if (error) {
    console.error('Erro ao salvar lead:', error.message)
    return { ok: false, mensagem: 'Não foi possível enviar agora. Tente novamente em instantes.' }
  }
  return { ok: true, mensagem: 'Recebemos seu contato! Responderemos em até 1 dia útil.' }
}

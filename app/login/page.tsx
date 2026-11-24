import type { Metadata } from 'next'
import { LoginForm } from '@/components/LoginForm'

export const metadata: Metadata = {
  title: 'Entrar',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-semibold text-marca-escura">Área do administrador</h1>
      <p className="mt-2 text-texto-suave">Acesso restrito à equipe para consultar os leads do site.</p>
      <div className="mt-6">
        <LoginForm />
      </div>
    </div>
  )
}

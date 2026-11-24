import type { Metadata } from 'next'
import { marca } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como a Verde Vale Orgânicos (empresa fictícia) trata seus dados pessoais, conforme a LGPD.',
}

// MODELO para portfólio. Em cliente real, revisar com o jurídico e preencher os marcadores.
export default function PoliticaPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 space-y-6 leading-relaxed">
      <h1 className="text-3xl font-semibold text-marca-escura">Política de Privacidade</h1>
      <p className="rounded-xl bg-suave p-4 text-sm">
        Modelo ilustrativo de um projeto fictício. Em um site real, substitua os marcadores e valide o texto com assessoria jurídica.
      </p>

      <section>
        <h2 className="text-xl font-semibold">1. Quem é o controlador</h2>
        <p>{marca.nome}, [INSERIR RAZÃO SOCIAL], CNPJ [INSERIR CNPJ], [INSERIR ENDEREÇO]. Contato: {marca.email}.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">2. Quais dados coletamos</h2>
        <p>No formulário de contato: nome, e-mail, telefone (opcional), interesse e mensagem, além da data do seu consentimento.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">3. Para que usamos</h2>
        <p>Somente para responder ao seu pedido e oferecer nossas cestas. Base legal: consentimento (art. 7º, I, da LGPD).</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">4. Com quem compartilhamos</h2>
        <p>Com provedores que hospedam o site e o banco de dados, apenas para operar o serviço. Não vendemos seus dados.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">5. Por quanto tempo guardamos</h2>
        <p>Até [INSERIR PRAZO, ex.: 12 meses] após o último contato, ou até você pedir a exclusão.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">6. Seus direitos</h2>
        <p>Você pode pedir acesso, correção, exclusão ou revogar o consentimento a qualquer momento pelo e-mail {marca.email}.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">7. Cookies</h2>
        <p>Usamos apenas cookies essenciais, como o de sessão da área administrativa. Não usamos cookies de publicidade.</p>
      </section>

      <p className="text-sm text-texto-suave">Última atualização: [INSERIR DATA].</p>
    </article>
  )
}

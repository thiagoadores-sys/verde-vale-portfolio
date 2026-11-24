// Configurações da marca e metas — EMPRESA E VALORES FICTÍCIOS (portfólio)

export const marca = {
  nome: 'Verde Vale Orgânicos',
  slogan: 'Cestas de orgânicos direto do produtor, na sua porta.',
  whatsapp: '(11) 90000-0000', // número fictício
  email: 'contato@example.com', // domínio reservado para exemplos
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

// Meta mensal de receita usada no dashboard (fictícia)
export const META_RECEITA_MENSAL = 36000

export const rotulos: Record<string, string> = {
  site: 'Site',
  whatsapp: 'WhatsApp',
  feira: 'Feira',
  empresas: 'Empresas',
  cestas: 'Cestas',
  frutas: 'Frutas',
  verduras: 'Verduras',
  legumes: 'Legumes',
  cesta_semanal: 'Cesta semanal',
  cesta_quinzenal: 'Cesta quinzenal',
  outro: 'Outro',
}

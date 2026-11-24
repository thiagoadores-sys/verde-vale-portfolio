import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/painel', '/politica-de-privacidade'].map((rota) => ({
    url: `${siteUrl}${rota}`,
    lastModified: new Date(),
  }))
}

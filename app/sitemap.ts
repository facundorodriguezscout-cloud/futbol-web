import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabaseClient';

const SITIO = 'https://futbol-web-seven.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: articulos } = await supabase.from('articulos').select('slug, creado_en');

  const urlsArticulos = (articulos || []).map((a) => ({
    url: `${SITIO}/articulos/${a.slug}`,
    lastModified: new Date(a.creado_en),
  }));

  return [
    { url: SITIO, lastModified: new Date() },
    { url: `${SITIO}/articulos`, lastModified: new Date() },
    ...urlsArticulos,
  ];
}
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default async function Articulos() {
  const { data: articulos } = await supabase
    .from('articulos')
    .select('titulo, slug, fecha')
    .order('fecha', { ascending: false });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <header className="border-b border-slate-800 py-5 mb-8">
        <div className="max-w-3xl mx-auto px-4">
          <Link href="/">
            <h1 className="text-2xl font-bold tracking-tight">
              Gol<span className="text-cyan-400">Data</span>
            </h1>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="text-lg font-semibold mb-5 text-slate-100">Análisis</h2>

        <div className="space-y-3">
          {articulos?.map((a) => (
            <Link
              key={a.slug}
              href={`/articulos/${a.slug}`}
              className="block rounded-lg border border-slate-800 p-4 hover:border-cyan-400/50 transition-colors"
            >
              <p className="font-medium text-slate-100">{a.titulo}</p>
              <p className="text-xs text-slate-500 mt-1">
                {new Date(a.fecha).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </Link>
          ))}

          {(!articulos || articulos.length === 0) && (
            <p className="text-slate-500 text-sm">Todavía no hay artículos publicados.</p>
          )}
        </div>
      </main>
    </div>
  );
}
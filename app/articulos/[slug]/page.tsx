import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Articulo({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: articulo } = await supabase
    .from('articulos')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!articulo) return notFound();

  const parrafos = articulo.contenido.split('\n\n');

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

      <main className="max-w-2xl mx-auto px-4 pb-16">
        <Link href="/articulos" className="text-cyan-400 text-sm hover:underline">
          ← Volver a Análisis
        </Link>

        <h2 className="text-2xl font-bold text-slate-100 mt-4 mb-2">{articulo.titulo}</h2>
        <p className="text-xs text-slate-500 mb-6">
          {new Date(articulo.fecha).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <div className="space-y-4 text-slate-300 leading-relaxed">
          {parrafos.map((p: string, i: number) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </main>
    </div>
  );
}
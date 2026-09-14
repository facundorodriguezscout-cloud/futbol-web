import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default async function Home() {
  const { data, error } = await supabase
    .from('posiciones')
    .select('*')
    .order('zona')
    .order('posicion');

  if (error) {
    return <div className="p-8 text-red-400">Error: {error.message}</div>;
  }

  const zonas: Record<string, typeof data> = {};
  data?.forEach((fila) => {
    if (!zonas[fila.zona]) zonas[fila.zona] = [];
    zonas[fila.zona].push(fila);
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <header className="border-b border-slate-800 py-5 mb-8">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl font-bold tracking-tight">
            Gol<span className="text-cyan-400">Data</span>
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">Estadísticas del fútbol argentino</p>
          
        </div>
        <Link href="/articulos" className="text-cyan-400 text-sm hover:underline inline-block mt-2">
  Ver Análisis →
</Link>
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="text-lg font-semibold mb-5 text-slate-100">Torneo Federal A</h2>

        {Object.entries(zonas).map(([zona, equipos]) => (
          <div key={zona} className="mb-6 rounded-lg border border-slate-800 overflow-hidden">
            <h3 className="bg-slate-900 px-4 py-2.5 text-sm font-medium text-cyan-400 border-b border-slate-800">
              {zona}
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 text-xs uppercase tracking-wide">
                  <th className="py-2 px-3 font-medium">#</th>
                  <th className="py-2 px-3 font-medium">Equipo</th>
                  <th className="py-2 px-3 font-medium text-center">PTS</th>
                  <th className="py-2 px-3 font-medium text-center">PJ</th>
                  <th className="py-2 px-3 font-medium text-center">+/-</th>
                </tr>
              </thead>
              <tbody>
                {equipos?.map((e) => (
                  <tr
                    key={e.id}
                    className="border-t border-slate-800/60 hover:bg-slate-900/50 transition-colors"
                  >
                    <td className="py-2.5 px-3 text-slate-500">{e.posicion}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-100">{e.equipo}</td>
                    <td className="py-2.5 px-3 text-center font-bold text-cyan-400">{e.puntos}</td>
                    <td className="py-2.5 px-3 text-center text-slate-400">{e.jugados}</td>
                    <td className="py-2.5 px-3 text-center text-slate-400">{e.diferencia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        <p className="text-xs text-slate-600 mt-8">
          Datos actualizados automáticamente. GolData — {new Date().getFullYear()}
        </p>
      </main>
    </div>
  );
}
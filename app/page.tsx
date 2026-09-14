import { supabase } from '@/lib/supabaseClient';

export default async function Home() {
  const { data, error } = await supabase
    .from('posiciones')
    .select('*')
    .order('zona')
    .order('posicion');

  if (error) {
    return <div className="p-8 text-red-600">Error: {error.message}</div>;
  }

  const zonas: Record<string, typeof data> = {};
  data?.forEach((fila) => {
    if (!zonas[fila.zona]) zonas[fila.zona] = [];
    zonas[fila.zona].push(fila);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white py-4 mb-6">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl font-bold">
            Gol<span className="text-green-400">Data</span>
          </h1>
          <p className="text-gray-400 text-sm">Estadísticas del fútbol argentino</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-12">
        <h2 className="text-xl font-semibold mb-4">Torneo Federal A</h2>

        {Object.entries(zonas).map(([zona, equipos]) => (
          <div key={zona} className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden">
            <h3 className="bg-gray-100 px-4 py-2 font-medium text-sm">{zona}</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2 px-3">#</th>
                  <th className="py-2 px-3">Equipo</th>
                  <th className="py-2 px-3 text-center">PTS</th>
                  <th className="py-2 px-3 text-center">PJ</th>
                  <th className="py-2 px-3 text-center">+/-</th>
                </tr>
              </thead>
              <tbody>
                {equipos?.map((e, i) => (
                  <tr key={e.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-2 px-3">{e.posicion}</td>
                    <td className="py-2 px-3 font-medium">{e.equipo}</td>
                    <td className="py-2 px-3 text-center font-semibold text-green-700">{e.puntos}</td>
                    <td className="py-2 px-3 text-center text-gray-600">{e.jugados}</td>
                    <td className="py-2 px-3 text-center text-gray-600">{e.diferencia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </main>
    </div>
  );
}
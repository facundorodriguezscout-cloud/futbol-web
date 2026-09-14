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

  // Agrupamos los equipos por zona
  const zonas: Record<string, typeof data> = {};
  data?.forEach((fila) => {
    if (!zonas[fila.zona]) zonas[fila.zona] = [];
    zonas[fila.zona].push(fila);
  });

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Torneo Federal A</h1>

      {Object.entries(zonas).map(([zona, equipos]) => (
        <div key={zona} className="mb-8">
          <h2 className="text-lg font-semibold mb-2">{zona}</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="py-1">#</th>
                <th className="py-1">Equipo</th>
                <th className="py-1 text-center">PTS</th>
                <th className="py-1 text-center">PJ</th>
                <th className="py-1 text-center">+/-</th>
              </tr>
            </thead>
            <tbody>
              {equipos?.map((e) => (
                <tr key={e.id} className="border-b">
                  <td className="py-1">{e.posicion}</td>
                  <td className="py-1">{e.equipo}</td>
                  <td className="py-1 text-center font-semibold">{e.puntos}</td>
                  <td className="py-1 text-center">{e.jugados}</td>
                  <td className="py-1 text-center">{e.diferencia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </main>
  );
}
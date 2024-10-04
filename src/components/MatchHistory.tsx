const partidas = [
  { adversarioA: "Roberto", adversarioB: "Fernando", pontosA: 5, pontosB: 2, Dupla: "Juan Brys" },
  { adversarioA: "Antonio", adversarioB: "Carlos", pontosA: 3, pontosB: 5, Dupla: "Juan Brys" },
  { adversarioA: "Marcos", adversarioB: "João", pontosA: 5, pontosB: 0, Dupla: "Pedro Lobato" },
  { adversarioA: "Pedro", adversarioB: "Lucas", pontosA: 5, pontosB: 4, Dupla: "Jennifer Torchelsen" },
  { adversarioA: "Ricardo", adversarioB: "José", pontosA: 2, pontosB: 5, Dupla: "Juan Brys" },
  { adversarioA: "Fernando", adversarioB: "Antonio", pontosA: 5, pontosB: 3, Dupla: "Jennifer Torchelsen" },
  { adversarioA: "Carlos", adversarioB: "Marcos", pontosA: 5, pontosB: 4, Dupla: "Juan Brys" },
  { adversarioA: "João", adversarioB: "Pedro", pontosA: 5, pontosB: 3, Dupla: "Pedro Lobato" },
];

const HistoricoPartidas = () => {
  return (
    <div className="container mx-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg">
        <thead className="border-collapse border border-gray-300">
          <tr>
            <th className="py-2 px-4 bg-gray-100">V/D</th>
            <th className="py-2 px-4 bg-gray-100">Sua Dupla</th>
            <th className="py-2 px-4 bg-gray-100">Pontos</th>
            <th className="py-2 px-4 bg-gray-100">Adversáros 1</th>
            <th className="py-2 px-4 bg-gray-100">Adversáros 2</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {
            partidas.map((usuario, index) => (
              <tr key={index} className={usuario.pontosA > usuario.pontosB ? "bg-green-400" : "bg-red-400"}>
                <td className="py-2 px-4 border border-gray-300">
                  {usuario.pontosA > usuario.pontosB ? "V" : "D"}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {usuario.Dupla}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {usuario.pontosA} x {usuario.pontosB}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {usuario.adversarioA}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {usuario.adversarioB}
                </td>

              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default HistoricoPartidas;

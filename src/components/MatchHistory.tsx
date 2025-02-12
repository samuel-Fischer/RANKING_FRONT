import axiosInstance from "@/api/axiosInstance";
import { useEffect, useState } from "react";

type MatchHistory = {
  adversario1: string;
  adversario2: string;
  placarTime: number;
  placarAdversario: number;
  parceiro: string;
  data: string;
}

const MatchHistory = ({ id }: { id: number }) => {
  const [partidas, setPartidas] = useState<MatchHistory[]>([]);

  useEffect(() => {
    async function getPartidas() {
      try {
        const response = await axiosInstance.get(`/partidas/usuario/${id}`);
        const data = response.data;
        console.log(data);
        setPartidas(data.map((partida: MatchHistory) => ({
          adversario1: partida.adversario1,
          adversario2: partida.adversario2,
          placarTime: partida.placarTime,
          placarAdversario: partida.placarAdversario,
          parceiro: partida.parceiro,
          data: partida.data
        })));

      } catch (error) {
        console.error('Error getting matches', error);
      }
    }
    getPartidas();
  }, [id]);

  // console.log(partidas);
  return (
    <div className="flex items-center justify-center">
      <div className="overflow-x-auto relative shadow-md rounded-xl">

        <table className="min-w-full table-auto rounded-xl">
          <thead className="border-collapse bg-gray-100">
            <tr>
              <th className="py-2 px-4">V/D</th>
              <th className="py-2 px-4">Dupla</th>
              <th className="py-2 px-4">Placar</th>
              <th className="py-2 px-4">Adversáros</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {
              partidas.map((partida, index) => (
                <tr key={index} className={partida.placarTime > partida.placarAdversario ? "bg-green-400" : "bg-red-400"}>
                  <td className="py-2 px-4">
                    {partida.placarTime > partida.placarAdversario ? "V" : "D"}
                  </td>
                  <td className="py-2 px-4">
                    {partida.parceiro}
                  </td>
                  <td className="py-2 px-4">
                    {partida.placarTime} x {partida.placarAdversario}
                  </td>
                  <td className="py-2 px-4">
                    {partida.adversario1}, {partida.adversario2}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchHistory;

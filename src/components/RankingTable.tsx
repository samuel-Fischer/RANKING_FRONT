import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import axiosInstance from "@/api/axiosInstance";
import perfil from "../app/home/perfil.png"

interface Usuario {
  id: number;
  classificacao: number;
  usuario: string;
  cidade: string;
  foto: string;
  pontos: number;
  jogos: number;
  vitorias: number;
  derrotas: number;
  percentual: number;
}

const RankingTable = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    axiosInstance.get('/status')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar usuários:', error);
      });
  }, []);

  return (
    <div className="container mx-auto w-full">
      <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg">
        <thead className="border-collapse border border-gray-300">
          <tr>
            <th className="py-2 px-4 bg-gray-100">Classificação</th>
            <th className="py-2 px-4 bg-gray-100">Cidade</th>
            <th className="py-2 px-4 bg-gray-100">Pontos</th>
            <th className="py-2 px-4 bg-gray-100">Jogos</th>
            <th className="py-2 px-4 bg-gray-100">Vitórias</th>
            <th className="py-2 px-4 bg-gray-100">Derrotas</th>
            <th className="py-2 px-4 bg-gray-100">%</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {
            usuarios.filter(usuario => usuario.jogos > 0).slice(0, 17).map((usuario, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                <td className="py-2 px-4 flex items-center">{index + 1}.
                  <Image
                    src={usuario.foto || perfil}
                    alt={`Foto de ${usuario.usuario}`}
                    className="rounded-full mr-2 ms-3"
                    width={40}
                    height={40} />
                  <Link href={`profile/${usuario.id}`}>{usuario.usuario}</Link>
                </td>
                <td className="py-2 px-4">{usuario.cidade}</td>
                <td className="py-2 px-4">{usuario.pontos}</td>
                <td className="py-2 px-4">{usuario.jogos}</td>
                <td className="py-2 px-4">{usuario.vitorias}</td>
                <td className="py-2 px-4">{usuario.derrotas}</td>
                <td className="py-2 px-4">{(usuario.percentual).toFixed(2)}%</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;

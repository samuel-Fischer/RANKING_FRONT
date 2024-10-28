import { Flag, Flame, Medal } from "lucide-react";

const partidas = [
  { jogos: 32, desistencias: 0, vitorias: 20, porcentagem: 62.5 }
];

export default function StatusBarGames() {
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  return (
    <div className="flex flex-row">
      <div className="grid grid-cols-3 text-button-blue">
        <div className="flex flex-col items-center">
          <div className="flex font-semibold">
            <Flame  strokeWidth={3} />
            <span className="ml-2">{formatNumber(partidas[0].jogos)}</span>
          </div>
          <p className="font-light">Jogos</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex font-semibold">
            <Flag strokeWidth={3} />
            <span className="ml-2">{formatNumber(partidas[0].desistencias)}</span>
          </div>
          <p className="font-light">Desistências</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex font-semibold">
            <Medal size={25} strokeWidth={2} />
            <span className="ml-2">{formatNumber(partidas[0].vitorias)}</span>
          </div>
          <p className="font-light">Vitórias</p>
        </div>
      </div>
    </div>
  );
};
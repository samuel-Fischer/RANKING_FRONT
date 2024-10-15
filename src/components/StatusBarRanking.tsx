const raking = [
  { pontos: 1826, rankingGeral: 27, rankingMelhorQuadra: 6 }
];

export default function StatusBarRanking () {
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-center text-center text-button-blue">
        <div className="flex">
          <p className="font-light">Pontos</p>
          <div className="flex font-semibold">
            <span className="ml-2">{formatNumber(raking[0].pontos)}</span>
          </div>
        </div>
        <div className="flex flex-row">
          <p className="font-light">Ranking Geral</p>
          <div className="flex font-semibold">
            <span className="ml-2">{formatNumber(raking[0].rankingGeral)}</span>
          </div>
        </div>
        <div className="flex flex-row">
          <p className="font-light">Ranking Melhor Quadra</p>
          <div className="flex font-semibold">
            <span className="ml-2">{formatNumber(raking[0].rankingMelhorQuadra)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
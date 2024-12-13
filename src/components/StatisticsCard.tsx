import React, { useEffect, useState } from 'react';
import axiosInstance from '@/api/axiosInstance';

interface Props {
  amigoId: number;
}

interface Statistics {
  aoLado: {
    jogos: number;
    vitorias: number;
    derrotas: number;
    taxaVitorias: number;
  };
  contra: {
    jogos: number;
    vitorias: number;
    derrotas: number;
    taxaVitorias: number;
  };
}

const StatisticsCard: React.FC<Props> = ({ amigoId }) => {
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const response = await axiosInstance.get(`/partidas/estatisticas/${amigoId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth.token')}`,
          },
        });
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics', error);
      }
    }

    fetchStatistics();
  }, [amigoId]);

  if (!statistics) {
    return <div>Carregando estatísticas...</div>;
  }

  return (
    <div className="bg-gray-100 text-center shadow-md rounded-lg p-6 w-full text-primary-blue">
      <div className="mt-4">
        <p className="text-3xl pb-2 font-semibold text-primary-blue text-button-blue">Com Você</p>
        <p>Total de Vitórias: <span className='font-bold'>{statistics.aoLado.vitorias}</span></p>
        <p>Total de Derrotas: <span className='font-bold'>{statistics.aoLado.derrotas}</span></p>
        <p>Partidas Jogadas: <span className='font-bold'>{statistics.aoLado.jogos}</span></p>
        <p>Taxa de Vitória: <span className='font-bold'>{(statistics.aoLado.taxaVitorias).toFixed(0)}%</span></p>
      </div>
      <div className="mt-12">
        <p className="text-3xl pb-2 font-semibold text-primary-blue text-button-blue">Contra Você</p>
        <p>Total de Vitórias: <span className='font-bold'>{statistics.contra.vitorias}</span></p>
        <p>Total de Derrotas: <span className='font-bold'>{statistics.contra.derrotas}</span></p>
        <p>Partidas Jogadas: <span className='font-bold'>{statistics.contra.jogos}</span></p>
        <p>Taxa de Vitórias: <span className='font-bold'>{(statistics.contra.taxaVitorias).toFixed(0)}%</span></p>
      </div>
    </div>
  );
};

export default StatisticsCard;

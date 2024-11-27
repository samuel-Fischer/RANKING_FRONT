import axiosInstance from "@/api/axiosInstance";
import { Flag, Flame, Medal } from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  id: number;
  nome: string;
  email: string;
  foto: string;
}

interface Games {
  jogos: number;
  desistencias: number;
  vitorias: number;
}

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('auth.user');
  return user ? JSON.parse(user) : null;
};

export default function StatusBarGames() {
  const [user, setUser] = useState<User | null>(null);
  const [games, setGames] = useState<Games | null>(null);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    setUser(storedUser);
  }, []);

  useEffect(() => {
    async function getGames() {
      if (user?.id) {
        try {
          const response = await axiosInstance.get(`status/${user.id}`);
          const data = response.data;
          setGames(data);
        } catch (error) {
          console.error('Error getting games', error);
        }
      }
    }
    getGames();
  }, [user]);

  return (
    <div className="flex flex-row">
      <div className="grid grid-cols-3 text-button-blue">
        <div className="flex flex-col items-center">
          <div className="flex font-semibold">
            <Flame strokeWidth={3} />
            <span className="ml-2">{formatNumber(games?.jogos ?? 0)}</span>
          </div>
          <p className="font-light">Jogos</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex font-semibold">
            <Flag strokeWidth={3} />
            <span className="ml-2">{formatNumber(games?.desistencias ?? 0)}</span>
          </div>
          <p className="font-light">Desistências</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex font-semibold">
            <Medal size={25} strokeWidth={2} />
            <span className="ml-2">{formatNumber(games?.vitorias ?? 0)}</span>
          </div>
          <p className="font-light">Vitórias</p>
        </div>
      </div>
    </div>
  );
};
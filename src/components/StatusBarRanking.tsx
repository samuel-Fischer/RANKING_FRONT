import axiosInstance from "@/api/axiosInstance";
import { useEffect, useState } from "react";

const raking = [
  { rankingMelhorQuadra: 6 }
];

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('auth.user');
  return user ? JSON.parse(user) : null;
};

interface User {
  id: number;
  nome: string;
  email: string;
  foto: string;
}

interface Points {
  points: number;
}

interface Position {
  position: number;
}

const StatusBarRanking = () => {
  const [user, setUser] = useState<User | null>(null);
  const [points, setPoints] = useState<Points | null>(null);
  const [position, setPosition] = useState<Position | null>(null);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

 useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    setUser(storedUser);
  }, []);

  useEffect(() => {
    async function getPosition() {
      if (user?.id) {
        try {
          const response = await axiosInstance.get(`status/position/${user.id}`);
          const data = response.data;
          setPosition({ position: data.position });
        } catch (error) {
          console.error('Error getting position', error);
        }
      }
    }
    getPosition();
  }, [user]);
  
  useEffect(() => {
    async function getPoints() {
      if (user?.id) {
        try {
          const response = await axiosInstance.get(`status/${user.id}`);
          const data = response.data;
          setPoints({ points: data.pontos });
        } catch (error) {
          console.error('Error getting points', error);
        }
      }
    }
    getPoints();
  }, [user]);

  return (
    <div className="flex">
      <div className="flex flex-col items-center text-center text-button-blue">
        <div className="flex">
          <p className="font-light">Pontos</p>
          <div className="flex font-semibold">
            <span className="ml-2">{formatNumber(points?.points ?? 0)}</span>
          </div>
        </div>
        <div className="flex flex-row">
          <p className="font-light">Ranking Geral</p>
          <div className="flex font-semibold">
            <span className="ml-2">{formatNumber(position?.position ?? 0)}</span>
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

export default StatusBarRanking;
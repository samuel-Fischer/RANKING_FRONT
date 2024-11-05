'use client';
import Image from "next/image";
import { useEffect, useState } from "react";

import perfil from '../../home/perfil.png';
import axiosInstance from "@/api/axiosInstance";
import StatusBarGames from "@/components/StatusBarGames";
import StatusBarRanking from "@/components/StatusBarRanking";
import MatchHistory from "@/components/MatchHistory";
import Challenges from "@/components/Challenges";

interface Props {
  params: { id: number };
}

type User = {
  id: number;
  nome: string;
  email: string;
  points: number;
};

const Profile = ({ params }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axiosInstance.get(`/usuarios/${params.id}`);
        const data = response.data;
        setUser(data);
      } catch (error) {
        console.error('Error getting user', error);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getPoints() {
      if (user !== null) {
        try {
          const response = await axiosInstance.get(`/status/${user.id}`);
          const data = response.data;
          setUser({ ...user, points: data.pontos });
        } catch (error) {
          console.error('Error getting points', error);
        }
      }
    }
    getPoints();
  }, [user]);

  const getRanking = (points: number) => {
    return Math.max(7 - Math.floor(points / 500), 1);
  };
  
  const userRanking = user ? getRanking(user.points) : null;

  return (
    <>
      <div className="flex bg-primary-blue">
        <Image src={perfil} alt="Foto de Perfil" className="rounded-full bg-blue-200 w-20 ml-10 my-10" />
        <div className="flex flex-col justify-center">
          <p className="text-white text-2xl font-bold ml-4">
            {user?.nome}
          </p>
          <span className="text-white text-sm ml-4 hover:text-gray-300 hover:cursor-pointer">
            Nível {userRanking}
          </span>
        </div>

        <div className="flex items-end justify mb-5 text-xl">
          <span className="text-gray-300 pb-0.5 mx-10">
            Cidade #1
          </span>
          <span className="text-gray-300 pb-0.5 me-10">
            Estado #27
          </span>
          <span className="text-gray-300 pb-0.5">
            País #132
          </span>
        </div>

        <div className="flex-grow"></div>

        <div className="flex flex-col items-center justify-center text-2xl me-20">
          <button className="flex w-full justify-center rounded-full bg-white py-2.5 px-10 text-xl font-semibold leading-6 text-primary-blue shadow-sm hover:bg-blue-200">
            Desafiar
          </button>
        </div>
      </div>

      <div className='flex flex-row flex-wrap text-3xl justify-center w-screen m-5'>
        <div className="flex bg-gray-100 shadow-md rounded-3xl m-5 p-10">
          <StatusBarGames />
        </div>
        <div className="flex bg-gray-100 shadow-md rounded-3xl m-5 px-16 py-5">
          <StatusBarRanking />
        </div>
      </div>

      <div className='flex flex-row flex-wrap text-2xl justify-center w-screen my-16'>
        <div className="flex columns-2">
          <div className="flex flex-col items-center px-3 justify-top">
            <p className="font-bold text-3xl py-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-600">Últimos Confrontos</p>
            <MatchHistory id={user?.id} />
          </div>
        </div>

        <div className="flex columns-2">
          <div className="flex flex-col items-center px-3 justify-top">
            <p className="font-bold text-3xl py-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-600">Desafios</p>
            <Challenges />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
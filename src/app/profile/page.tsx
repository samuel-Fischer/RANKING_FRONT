"use client";
import React, { useEffect, useState } from 'react';
// import HistoricoPartidas from '@/components/HistoricoPartidas';
import perfil from '../home/perfil.png';
import Image from 'next/image';
// import { useRouter } from 'next/navigation';
import withAuth from '@/components/withAuth';
import HistoricoPartidas from '@/components/MatchHistory';

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('auth.user');
  return user ? JSON.parse(user) : null;
};

interface User {
  id: string;
  nome: string;
  email: string;
  points: number;
}


const Perfil = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    setUser(storedUser);
  }, []);

  return (
    <>
      <div className="flex bg-primary-blue">
        <Image src={perfil} alt="Foto de Perfil" className="rounded-full bg-blue-200 w-20 ml-10 my-10" />
        <div className="flex flex-col justify-center">
          <p className="text-white text-2xl font-bold ml-4">
            {user?.nome || 'Usuario não encontrado'}
          </p>
          <span className="text-white text-sm ml-4 hover:text-gray-300 hover:cursor-pointer">
            Nível 3
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
          <button className="flex w-full justify-center rounded-full bg-white py-2.5 px-16 text-xl font-semibold leading-6 text-primary-blue shadow-sm hover:bg-blue-200 mt-4">
            Pesquisar
          </button>
        </div>
      </div>

      <div className="flex columns-2">
        <div className="flex flex-col items-center px-3 justify-center">
          <p className='font-bold text-2xl py-4'>Últimos Confrontos</p>
          <HistoricoPartidas />
        </div>
      </div>
    </>
  );
}

export default withAuth(Perfil);


// retornar o status do jogador
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import perfil from "../app/home/perfil.png";
import axiosInstance from "@/api/axiosInstance";

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("auth.user");
  return user ? JSON.parse(user) : null;
};

type User = {
  id: number;
}

type Friend = {
  id: number;
  nome: string;
  foto: string | null;
  status: {
    pontos: number;
  };
};

const FriendsList = () => {
  const [user, setUser] = useState<User | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    async function fetchFriends() {
      if (user) {
        try {
          const response = await axiosInstance.get("/amizades", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth.token")}`,
            },
          });
          const data = response.data;

          const mappedFriends = data.map((amizade: any) => {
            const amigo =
              amizade.usuario.id === Number(user.id)
                ? amizade.amigo
                : amizade.usuario;
            return {
              id: amigo.id,
              nome: amigo.nome,
              foto: amigo.foto,
              status: {
                pontos: amigo.status.pontos,
              },
            };
          });

          setFriends(mappedFriends);
        } catch (error) {
          console.error("Error fetching friends", error);
        }
      }
    }

    fetchFriends();
  }, [user]);

  const handleChallenge = (id: number) => {
    try {
      axiosInstance.post(`mensagens`, {
        remetenteId: user?.id,
        destinatarioId: id,
        mensagem: `desafiou você para uma partida!`,
        tipo: "desafio"
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth.token')}`,
        }
      }
      );
      toast.success("Desafio enviado com sucesso!");
    } catch (error) {
      console.error('Error challenging', error);
      toast.error("Erro ao enviar o Desafio!");
    }
  };

  const getRanking = (points: number) => {
    return Math.max(7 - Math.floor(points / 500), 1);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <div className="flex gap-x-4 gap-y-6">
        <div className="flex xl:flex-wrap gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 pb-4">
          {friends.map((friend) => (
            <div
            key={friend.id}
            className="bg-gray-100 border rounded-lg border-gray-300 font-bold w-48 h-auto flex flex-col shadow items-center"
            >
              <div className="flex justify-center mt-4">
                <Image
                  src={
                    friend.foto
                      ? `http://localhost:3000/usuarios/foto/${friend.foto}`
                      : perfil.src
                  }
                  alt="Foto do amigo"
                  width={65}
                  height={64}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col mt-5 text-center">
                <p className="text-primary-blue text-xl font-bold">{friend.nome}</p>
                <span className="text-gray-400 text-sm hover:text-gray-300 hover:cursor-pointer">
                  <Link href={`/profile/${friend.id}`} className="relative">
                    Ver Perfil
                  </Link>
                </span>
                <span className="text-primary-blue text-ml mt-3">Nível {getRanking(friend?.status.pontos ?? 0)}</span>
                <div className="flex justify-center">
                  <button
                    onClick={() => handleChallenge(friend.id)}
                    className="bg-primary-blue text-white py-2 px-4 rounded-3xl my-4"
                  >
                    Desafiar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FriendsList;
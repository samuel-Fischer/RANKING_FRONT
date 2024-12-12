"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";

interface Friend {
  id: number;
  nome: string;
  foto: string | null;
}

const FriendsPage = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem("auth.token");
        const storedUser = localStorage.getItem("auth.user");

        if (!token || !storedUser) {
          setError("Token ou usuário não encontrado. Faça login novamente.");
          return;
        }

        const userId = JSON.parse(storedUser).id; // Obtém o ID do usuário logado

        const response = await axiosInstance.get("/amizades", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          // Filtra e mapeia os amigos corretamente
          const mappedFriends = response.data
            .map((amizade: any) => {
              const amigo =
                amizade.usuario.id === userId
                  ? amizade.amigo
                  : amizade.usuario;
              return {
                id: amigo.id,
                nome: amigo.nome,
                foto: amigo.foto,
              };
            })
            .filter((friend) => friend.id !== userId); // Remove o usuário logado da lista

          setFriends(mappedFriends);
        } else {
          setError("Erro ao carregar amigos.");
        }
      } catch (err) {
        console.error("Erro ao buscar amigos:", err);
        setError("Erro ao buscar amigos. Verifique sua conexão.");
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6 text-primary-blue">Todos os Amigos</h1>
      {friends.length === 0 ? (
        <p>Você ainda não tem amigos adicionados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="bg-gray-100 border rounded-lg border-gray-300 font-bold w-52 h-64 flex flex-col items-center"
            >
              <div className="flex justify-center mt-4">
                <img
                  src={
                    friend.foto
                      ? `http://localhost:3000/usuarios/foto/${friend.foto}`
                      : "/default-profile.png"
                  }
                  alt={`Foto de ${friend.nome}`}
                  className="rounded-full w-20 h-20"
                />
              </div>
              <div className="flex flex-col mt-5 text-center">
                <p className="text-primary-blue text-2xl font-bold">{friend.nome}</p>
                <span className="text-gray-400 text-sm hover:text-gray-300 hover:cursor-pointer">
                  <a href={`/profile/${friend.id}`} className="relative">
                    Ver Perfil
                  </a>
                </span>
                <div className="flex justify-center">
                  <button
                    className="bg-primary-blue text-white py-2 px-4 rounded-3xl mt-4"
                  >
                    Desafiar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;

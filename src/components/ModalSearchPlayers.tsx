import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchIcon, X } from "lucide-react";
import axiosInstance from "@/api/axiosInstance";

type User = {
  id: number;
  name: string;
  photo?: string;
};

type ModalSearchProps = {
  isVisible: boolean;
  onClose: () => void;
};

const ModalSearchPlayers = ({ isVisible, onClose }: ModalSearchProps) => {
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isVisible) return null;

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm) {
        try {
          const response = await axiosInstance.get(`/usuarios/nomeOuApelido/${searchTerm}`);
          const transformedSuggestions = response.data.map((user: { id: number; nome: string; foto?: string }) => ({
            id: user.id,
            name: user.nome,
            photo: user.foto ? `http://localhost:3000/usuarios/foto/${user.foto}` : null, // Construção da URL completa
          }));
          setSuggestions(transformedSuggestions);
        } catch (error) {
          console.error('Error fetching user suggestions:', error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col">
        <button className="flex items-end justify-end" onClick={onClose}>
          <X className="text-gray-100 w-8 h-8 text-xl place-self-end" strokeWidth={3} />
        </button>
        <div className="w-[500px] h-[500px] flex flex-col bg-white rounded-lg shadow-lg">
          <div className="flex flex-col max-w-lg p-6 space-y-4">
            <div className="w-full">
              <p className="text-2xl font-bold text-center text-primary-blue">Pesquisar Por Jogador</p>
            </div>
          </div>

          <div className="flex flex-col justify-between max-w-lg px-6 pb-6 bg-white rounded-lg shadow-lg h-full">
            <div className="flex p-4 bg-gray-100 rounded-lg w-full mb-4">
              <div className="w-full flex flex-col items-center bg-gray-100 rounded-lg">
                <div className="w-full border border-gray-300 rounded-sm">
                  <label htmlFor="player-search" className="block text-center" />
                  <div className="relative">
                    <input
                      id="player-search"
                      placeholder="Procurar por jogador"
                      className="w-full pl-8 pb-1"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <SearchIcon className="absolute top-1/2 left-2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <div className="w-full space-y-2 cursor-pointer">
                  {suggestions.slice(0, 5).map((user) => (
                    <Link key={user.id} href={`profile/${user.id}`}>
                      <div className="flex items-center space-x-2 mt-2">
                        {user.photo ? (
                          <Image
                            src={user.photo}
                            alt={`Foto de ${user.name}`}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span>{user.name[0]}</span>
                          </div>
                        )}
                        <span>{user.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex w-full mt-auto">
              <button className="w-full bg-primary-blue text-white rounded-lg py-2 text-lg font-semibold">
                Pesquisar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSearchPlayers;

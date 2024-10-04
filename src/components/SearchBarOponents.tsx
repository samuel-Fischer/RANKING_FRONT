import { useState, useEffect } from 'react';
import { SearchIcon } from "lucide-react";
import axiosInstance from '@/api/axiosInstance';
import Image from 'next/image';

export interface User {
  id: number;
  name: string;
  photo?: string;
  selected: boolean;
}

interface SearchBarOponentsProps {
  suggestions: User[];
  setSuggestions: (users: User[]) => void;
  handleUserClick: (user: User) => void;
}

export function SearchBarOponents({ suggestions, setSuggestions, handleUserClick }: SearchBarOponentsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm) {
        try {
          const response = await axiosInstance.get(`/usuarios/nomeOuApelido/${searchTerm}`);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const transformedSuggestions = response.data.map((user: any) => ({
            ...user,
            name: user.nome,
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
  }, [searchTerm, setSuggestions]);

  return (
    <div className="w-full flex flex-col items-center bg-gray-100 rounded-lg">
      <div className="w-full border border-gray-300 rounded-sm">
        <label htmlFor="player-search" className="block text-center" />
        <div className="relative">
          <input
            id="player-search"
            placeholder="procurar por jogador"
            className="w-full pl-8 pb-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="absolute top-1/2 left-2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
      </div>
      <div className="w-full space-y-2 cursor-pointer">
        {suggestions.slice(0, 5).map((user) => (
          <div key={user.id} className="flex items-center space-x-2 mt-2" onClick={() => handleUserClick(user)}>
            {user?.photo ? (
              <Image src={user?.photo} alt={`Foto de ${user?.name}`} className="w-10 h-10 rounded-full"></Image>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span>{user?.name[0]}</span>
              </div>
            )}
            <span>{user?.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
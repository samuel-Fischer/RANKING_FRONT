import { useState } from "react";

import { X } from "lucide-react";
import { SearchBarOponents } from "./SearchBarOponents";

type User = {
  id: number;
  name: string;
  selected: boolean;
};

type ModalSearchProps = {
  isVisible: boolean;
  onClose: () => void;
};

const ModalSearchPlayers = ({ isVisible, onClose }: ModalSearchProps) => {
  if (!isVisible) return null;
  const [suggestions, setSuggestions] = useState<User[]>([]);

  function handleSelectPlayer(user: User) {
    console.log(user.name);
  }

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
              <SearchBarOponents setSuggestions={setSuggestions} suggestions={suggestions} handleUserClick={handleSelectPlayer} />
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
}

export default ModalSearchPlayers;

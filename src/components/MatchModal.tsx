/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import axiosInstance from "@/api/axiosInstance";

import ModalInput from "./ModalInput";
import { SearchBarOponents } from "./SearchBarOponents";

type User = {
  id: number;
  name: string;
  selected: boolean;
};

type Team = {
  player1: User;
  player2: User;
};

type MatchModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

const MatchModal = ({ isVisible, onClose }: MatchModalProps) => {
  if (!isVisible) return null;
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [results, setResults] = useState({
    results1: 0,
    results2: 0
  })
  const [team1, setTeam1] = useState<Team>({
    player1: {
      id: 0,
      name: "Selecionar",
      selected: true
    },
    player2: {
      id: 0,
      name: "Selecionar",
      selected: false
    },
  });

  const [team2, setTeam2] = useState<Team>({
    player1: {
      id: 0,
      name: "Selecionar",
      selected: false
    },
    player2: {
      id: 0,
      name: "Selecionar",
      selected: false
    },
  });

  const selectPlayer = (team: "team1" | "team2", player: "player1" | "player2") => {
    setTeam1({
      player1: { ...team1.player1, selected: false },
      player2: { ...team1.player2, selected: false },
    });
    setTeam2({
      player1: { ...team2.player1, selected: false },
      player2: { ...team2.player2, selected: false },
    });
    
    if (team === "team1") {
      setTeam1(prevState => ({
        ...prevState,
        [player]: {
          ...prevState[player],
          selected: !prevState[player].selected
        }
      }));
    } else {
      setTeam2(prevState => ({
        ...prevState,
        [player]: {
          ...prevState[player],
          selected: !prevState[player].selected
        }
      }));
    }
  };

  function handleSelectPlayer(user: User) {
    if (team1.player1.selected) {
      setTeam1(prevState => ({
        ...prevState,
        player1: {
          id: user.id,
          name: user.name,
          selected: true
        }
      }));
    } else if (team1.player2.selected) {
      setTeam1(prevState => ({
        ...prevState,
        player2: {
          id: user.id,
          name: user.name,
          selected: true
        }
      }));
    } else if (team2.player1.selected) {
      setTeam2(prevState => ({
        ...prevState,
        player1: {
          id: user.id,
          name: user.name,
          selected: true
        }
      }));
    } else if (team2.player2.selected) {
      setTeam2(prevState => ({
        ...prevState,
        player2: {
          id: user.id,
          name: user.name,
          selected: true
        }
      }));
    }
  }

  async function handleFetchResults() {
    try {
      const response = await axiosInstance.post("/partidas", {
        equipe1: {
          jogador1Id: team1.player1.id,
          jogador2Id: team1.player2.id
        },
        equipe2: {
          jogador1Id: team2.player1.id,
          jogador2Id: team2.player2.id
        },
        placarEquipe1: results.results1,
        placarEquipe2: results.results2
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 201) {
        alert("Partida cadastrada com sucesso!");
        onClose();
      }
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="w-[500px] flex flex-col">
        <button className="text-white text-xl place-self-end mr-1" onClick={onClose}>X</button>
        <div className="flex flex-col items-center justify-center max-w-lg p-6 space-y-4 bg-white rounded-lg shadow-lg">
          <div className="w-full">
            <p className="text-2xl font-bold text-center">Cadastrar Partida</p>
          </div>

          <div className="flex w-full space-x-4">
            <div className="flex flex-col items-center w-1/3 p-4 space-y-4 bg-blue-500 rounded-lg">
              <p className="w-full text-white text-center">TIME 1</p>
              <ModalInput
                value={team1.player1.name}
                onClick={() => selectPlayer("team1", "player1")}
                selecionado={team1.player1.selected}
              />
              <ModalInput
                value={team1.player2.name}
                onClick={() => selectPlayer("team1", "player2")}
                selecionado={team1.player2.selected}
              />
              <span className="w-full text-white text-center">X</span>
              <ModalInput
                value={team2.player1.name}
                onClick={() => selectPlayer("team2", "player1")}
                selecionado={team2.player1.selected}
              />
              <ModalInput
                value={team2.player2.name}
                onClick={() => selectPlayer("team2", "player2")}
                selecionado={team2.player2.selected}
              />
              <p className="w-full text-white text-center">TIME 2</p>
            </div>

            <div className="flex flex-col items-center w-2/3 p-4 space-y-4 bg-gray-100 rounded-lg">
              <SearchBarOponents setSuggestions={setSuggestions} suggestions={suggestions} handleUserClick={handleSelectPlayer} />
            </div>
          </div>
          <div className="flex flex-col items-end justify-end">
            <div className="flex w-full space-x-4">
              <div className="flex-1 flex flex-col items-center">
                <p className="text-center">TIME 1</p>
                <select
                  className="p-1 rounded-md text-black text-center border-2"
                  required
                  value={results.results1}
                  onChange={(e) => setResults({ ...results, results1: +(e.target.value) })}
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <p className="text-center">TIME 2</p>
                <select
                  className="p-1 rounded-md text-black text-center border-2"
                  required
                  value={results.results2}
                  onChange={(e) => setResults({ ...results, results2: +(e.target.value) })}
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex w-full space-x-4 mt-3">
              <button
                className="flex-1 p-1 rounded-md bg-green-500 text-white text-center px-10 py-2"
                onClick={handleFetchResults}
              >
                Enviar Resultados
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;

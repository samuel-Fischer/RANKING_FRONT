import { LogOut, UserCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import perfil from "../../src/app/home/perfil.png";

import ModalSearchPlayers from "./ModalSearchPlayers";
import MatchModal from "./MatchModal";
import axiosInstance from "@/api/axiosInstance";

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('auth.user');
  return user ? JSON.parse(user) : null;
};

type User = {
  id: number;
  nome: string;
  email: string;
  foto: string;
  points: number;
  position: number;
};

const Sidebar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const fetchUserDetails = useCallback(async () => {
    if (user) {
      try {
        const [statusResponse, friendsResponse,] = await Promise.all([
          axiosInstance.get(`/status/${user.id}`),
          axiosInstance.get(`/status/position/${user.id}`),
        ]);

        setUser((prevUser) => ({
          ...prevUser!,
          points: statusResponse.data.pontos,
          position: friendsResponse.data.position,
        }));
      } catch (error) {
        console.error('Error fetching user details', error);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  function logout() {
    localStorage.removeItem('auth.user');
    localStorage.removeItem('auth.token');
    setUser(null);
  }

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  const getRanking = (points: number) => {
    return Math.max(7 - Math.floor(points / 500), 1);
  };

  const userRanking = user ? getRanking(user.points) : null;

  const userPhoto = user?.foto
    ? `http://localhost:3000/usuarios/foto/${user.foto}`
    : perfil.src;

  return (
    <>
      <div className="flex-col fixed min-h-screen bg-primary-blue sm:w-64 md:w-80">
        <div className="flex">
          {/* <div className="absolute rounded-full bg-blue-200 w-20 h-20 mx-5 my-10"></div> */}
          <Image
            src={userPhoto}
            alt="Foto de Perfil"
            className="rounded-full bg-blue-200 w-20 h-20 ml-5 my-10"
            width={80}
            height={80}
          />
          <div className="flex flex-col justify-center">
            <p className="text-white text-2xl font-bold ml-4 flex items-center gap-2">
              {user?.nome}
              <Link href={user?.nome ? "/" : "/"} className="flex items-center ps-2 gap-2 relative font-bold text-primary-gray text-xl">
                {user?.nome ? <LogOut onClick={logout} /> : <UserCircle2 />}
              </Link>
            </p>
            <span className="text-gray-400 text-sm ml-4 hover:text-gray-300 hover:cursor-pointer">
              <Link href={user?.nome ? "/profile" : "/profile"} className="flex items-center gap-2 relative">Ver Perfil</Link>
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt7">
          <span className="text-white text-3xl font-bold">
            Ranking
          </span>
          <span className="text-white text-sm font-semibold">
            Nível {userRanking}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center mt-20 text-2xl">
          <span className="text-white pb-0.5">
            Posição #{user?.position}
          </span>
          <span className="text-white pb-0.5">
            Pontos: {formatNumber(user?.points ?? 0)}
          </span>
        </div>

        <div className="flex flex-col items-center justify-end text-2xl absolute bottom-10 px-8 w-full">
          <button className="flex w-full justify-center rounded-xl bg-white py-2.5 text-xl font-semibold leading-6 text-primary-blue shadow-sm hover:bg-blue-200"
            onClick={() => setShowModal(true)}>
            Cadastrar Resultado
          </button>
          <button className="flex w-full justify-center rounded-xl bg-white py-2.5 text-xl font-semibold leading-6 text-primary-blue shadow-sm hover:bg-blue-200 mt-4"
            onClick={() => setShowSearchBar(true)}>
            Pesquisar
          </button>
        </div>
        <ModalSearchPlayers isVisible={showSearchBar} onClose={() => setShowSearchBar(false)} />
        <MatchModal isVisible={showModal} onClose={() => setShowModal(false)} />
      </div>
    </>
  );
}

export default Sidebar;
import Image from "next/image";
import Link from "next/link";

import perfil from "../app/home/perfil.png";

const user = {
  nome: "Usuário",
};

const FriendsList = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-gray-100 border-collapse border rounded-lg border-gray-300 font-bold">
          <div>
            <Image src={perfil} alt="Foto de Perfil" className="rounded-full bg-blue-200 w-28 h-28 mx-10 mt-5">
            </Image>
          </div>
          <div className="flex flex-col mt-5">
            <p className="text-primary-blue justify-center text-2xl font-bold flex gap-2">
              {user?.nome}
            </p>
            <span className="text-gray-400 text-sm hover:text-gray-300 hover:cursor-pointer">
              <Link href={user?.nome ? "/profile" : "/profile"} className="flex gap-2 justify-center relative">Ver Perfil</Link>
            </span>
            <span className="flex text-primary-blue justify-center text-ml mt-3">
              Nível 1
            </span>
            <div>

            </div>
            <div className="flex button justify-center bg-primary-blue py-2 px-4 rounded-3xl m-4">
              <span className="text-white">Desafiar</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default FriendsList;
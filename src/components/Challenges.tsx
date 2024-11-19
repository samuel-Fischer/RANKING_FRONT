import Image from 'next/image'
import { useEffect, useState } from 'react';

import perfil from '../app/home/perfil.png';
import { Check, X } from 'lucide-react';
import axiosInstance from '@/api/axiosInstance';


type FriendRequests = {
  id: number;
  name: string;
  photo?: string;
  text: "te enviou uma solicitação de amizade.";
  time: string;
};

const Challenges = () => {
  const [friendRequests, setFriendRequests] = useState<FriendRequests[]>([]);

  useEffect(() => {
    async function FriendRequests() {
      try {
        const response = await axiosInstance.get(`/amizades/pendentes`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth.token')}`,
          }
        });
        const data = response.data;
        const friendRequestsData: FriendRequests[] = data.map((request: any) => ({
          id: request.id,
          name: request.usuario.nome,
          photo: request.usuario.foto,
          text: "te enviou uma solicitação de amizade."
        }));
        setFriendRequests(friendRequestsData);
      }
      catch (error) {
        console.error('Error getting friend requests', error);
      }
    }
    FriendRequests();
  }, []);

  function acceptFriendRequest(id: number) {
    try {
      axiosInstance.put(`/amizades/${id}`, { status: 'aceito' }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth.token')}`,
        }
      });
      const updatedFriendRequests = friendRequests.filter((request) => request.id !== id);
      setFriendRequests(updatedFriendRequests);
    } catch (error) {
      console.error('Error accepting friend request', error);
    }
  }

  function rejectFriendRequest(id: number) {
    try {
      axiosInstance.put(`/amizades/${id}`, { status: 'recusado' }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth.token')}`,
        }
      });
      const updatedFriendRequests = friendRequests.filter((request) => request.id !== id);
      setFriendRequests(updatedFriendRequests);
    } catch (error) {
      console.error('Error rejecting friend request', error);
    }
  }

  return (
    <div className='flex flex-col mx-10 px-5 pt-5 pb-1 bg-gray-100 shadow-md rounded-3xl'>
      {friendRequests.map((frinedR) => (
        <div key={frinedR.id}>
          <div className="flex pb-4">
            <Image src={perfil} alt="Foto de Perfil" className="rounded-full bg-blue-200 w-20" />
            <div className="flex flex-col ps-4 justify-center">
              <div className='flex flex-row'>
                <p className="text-2xl font-bold text-primary-blue">
                  {frinedR.name}
                </p>
                <p className="text-2xl ms-2">
                  {frinedR.text}
                </p>
              </div>
              <span className="text-sm">
                {frinedR.time}
              </span>
              <div className='flex flex-row justify-end'>
                <Check strokeWidth={3} className='text-green-500 w-8 h-8 hover:text-green-400 hover:cursor-pointer' onClick={() => acceptFriendRequest(frinedR.id)} />
                <X strokeWidth={3} className='text-red-500 w-8 h-8 hover:text-red-400 hover:cursor-pointer' onClick={() => rejectFriendRequest(frinedR.id)} />
              </div>
            </div>
          </div>
          <div className="mb-4" style={{ width: '100%', height: '2px', backgroundColor: 'LightGray' }}></div>
        </div>
      ))}
    </div>
  );
}

export default Challenges;
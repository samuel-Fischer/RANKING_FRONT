import Image from 'next/image'

import perfil from '../app/home/perfil.png';
import { Check, X } from 'lucide-react';
const desafios = [
  {
    id: 1,
    title: 'Desafio 1',
    description: 'te desafiou para uma partida.',
    challenger: 'Juan Brys',
    time: 'há 1 hora',
  },
  {
    id: 2,
    title: 'Desafio 2',
    description: 'te desafiou para uma partida.',
    challenger: 'Pedro Lobato',
    time: 'há 1 hora',
  },
  {
    id: 3,
    title: 'Desafio 3',
    description: 'te desafiou para uma partida.',
    challenger: 'Jennifer Torchelsen',
    time: 'há 1 hora',
  },
  {
    id: 4,
    title: 'Desafio 4',
    description: 'te desafiou para uma partida.',
    challenger: 'Mirunda Silva',
    time: 'há 1 hora',
  },
];

const Challenges = () => {
  return (
    <div className='flex flex-col mx-10 px-5 pt-5 pb-1 bg-gray-100 shadow-md rounded-3xl'>
      {desafios.map((desafio) => (
        <div key={desafio.id}>
          <div className="flex pb-4">
            <Image src={perfil} alt="Foto de Perfil" className="rounded-full bg-blue-200 w-20" />
            <div className="flex flex-col ps-4 justify-center">
              <div className='flex flex-row'>
                <p className="text-2xl font-bold text-primary-blue">
                  {desafio.challenger}
                </p>
                <p className="text-2xl ms-2">
                  {desafio.description}
                </p>
              </div>
              <span className="text-sm">
                {desafio.time}
              </span>
              <div className='flex flex-row justify-end'>
                <Check strokeWidth={3} className='text-green-500 w-8 h-8 hover:text-green-400 hover:cursor-pointer'/>
                <X strokeWidth={3} className='text-red-500 w-8 h-8 hover:text-red-400 hover:cursor-pointer'/>
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
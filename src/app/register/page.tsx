'use client'
import { useRef } from 'react';
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import dynamic from 'next/dynamic';

import axiosInstance from '@/api/axiosInstance';
import { useRouter } from 'next/navigation';

const PhoneInput = dynamic(() => import('react-phone-number-input/input'), {
  ssr: false,
});

type inputs = {
  nome: string;
  apelido: string;
  email: string;
  senha: string;
  dataNascimento: string;
  cidade: string;
  telefone: string;
}

export default function Example() {
  const { register, handleSubmit, setValue, reset } = useForm<inputs>({});
  const formRef = useRef(null);
  const router = useRouter();

  async function onSubmit(data: inputs) {
    console.log(data);
    try {
      const response = await axiosInstance.post('/usuarios/', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert('Usuário criado com sucesso!');
        console.log('Usuário criado com sucesso!');
        router.push('/login');
        reset();
      }
    } catch (error) {
      alert('Falha ao criar usuário');
      console.error('Falha ao criar usuário:', error);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Crie uma conta
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Nome
              </label>
              <div>
                <input
                  id="name"
                  type="name"
                  placeholder='nome completo'
                  required {...register("nome")}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-gray-900">
                Apelido
              </label>
              <div>
                <input
                  id="nickname"
                  type="nickname"
                  placeholder='apelido'
                  required {...register("apelido")}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                E-mail
              </label>
              <div>
                <input
                  id="email"
                  type="email"
                  placeholder='E-mail'
                  autoComplete="email"
                  required {...register("email")}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Senha
                </label>
              </div>
              <div>
                <input
                  id="password"
                  type="password"
                  placeholder='senha'
                  autoComplete="current-password"
                  required {...register("senha")}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="birth" className="block text-sm font-medium leading-6 text-gray-900">
                  Data de nascimento
                </label>
              </div>
              <div>
                <input
                  id="birth"
                  type="date"
                  autoComplete="birth"
                  required {...register("dataNascimento")}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  Cidade
                </label>
              </div>
              <div>
                <input
                  id="city"
                  type="city"
                  placeholder='cidade'
                  required {...register("cidade")}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                  Telefone
                </label>
              </div>
              <div>
                <PhoneInput
                  defaultCountry="BR"
                  id="phone"
                  type="phone"
                  placeholder='(xx) xxxxx-xxxx'
                  autoComplete="phone"
                  maxLength={15}
                  {...register("telefone")}
                  onChange={(value) => {
                    if (value) {
                      const numericValue = Number(value.replace(/[()\s-]/g, ''));
                      if (!isNaN(numericValue)) {
                        setValue("telefone", `+${numericValue}`);
                      }
                    }
                  }}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-button-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
              >
                Criar conta
              </button>
            </div>
          </form>

          <p className="mt-1 text-center text-sm text-gray-500">
            Já possui uma conta?{' '}
            <Link href="/login" className="font-semibold leading-6 text-primary-blue hover:text-blue-700">
              Logar na sua conta.
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
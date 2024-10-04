import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Ranking de Padel
        </h1>
        <p className="text-gray-600 mb-6">
          Para continuar, por favor faça o login ou registre-se.
        </p>

        <div className="flex flex-col md:flex-row md:justify-center gap-4">
          <Link href="/login">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 w-full md:w-auto">
              Fazer Login
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-200 w-full md:w-auto">
              Registrar-se
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
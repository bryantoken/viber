import Link from 'next/link';
import { useState } from 'react';

interface NavbarProps {
  isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-dark-900 border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-ruby-600 rotate-45 w-8 h-8 transform -translate-x-1 translate-y-1"></div>
                <span className="text-white font-bold text-2xl relative z-10">Viber</span>
              </div>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/playlists" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Playlists
              </Link>
              <Link href="/explore" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Explorar
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <>
                <Link href="/create" className="btn-primary mr-4">
                  Criar Playlist
                </Link>
                <Link href="/profile" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Perfil
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Entrar
                </Link>
                <Link href="/register" className="btn-primary">
                  Cadastrar
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ruby-500"
            >
              <span className="sr-only">Abrir menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/playlists" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Playlists
            </Link>
            <Link href="/explore" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Explorar
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/create" className="text-white bg-ruby-600 block px-3 py-2 rounded-md text-base font-medium">
                  Criar Playlist
                </Link>
                <Link href="/profile" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  Perfil
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  Entrar
                </Link>
                <Link href="/register" className="text-white bg-ruby-600 block px-3 py-2 rounded-md text-base font-medium">
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

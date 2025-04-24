import React from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks';
import { useRouter } from 'next/router';

export default function Navbar({ isLoggedIn }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-dark-900 border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-ruby-600 rotate-45 w-6 h-6 transform -translate-x-1 translate-y-1"></div>
                <span className="text-white font-bold text-xl relative z-10">Viber</span>
              </div>
            </Link>
            
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/playlists" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Playlists
              </Link>
              <Link href="/create" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Criar Playlist
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
              {isLoggedIn ? (
                <div className="relative ml-3">
                  <div className="flex items-center space-x-4">
                    <Link href="/profile" className="text-gray-300 hover:text-white text-sm font-medium">
                      {user?.username || 'Meu Perfil'}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-gray-300 hover:text-white text-sm font-medium"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Entrar
                  </Link>
                  <Link href="/register" className="bg-ruby-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-ruby-700">
                    Cadastrar
                  </Link>
                </div>
              )}
            </div>
            
            {/* Menu mobile */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-dark-700 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Abrir menu principal</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/playlists" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Playlists
          </Link>
          <Link href="/create" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Criar Playlist
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Meu Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Entrar
              </Link>
              <Link href="/register" className="bg-ruby-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-ruby-700">
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

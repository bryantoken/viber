import React from 'react';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import PlaylistCard from '../../components/PlaylistCard';

// Dados de exemplo para demonstração
const userData = {
  id: '101',
  username: 'joaosilva',
  email: 'joao.silva@email.com',
  fullName: 'João Silva',
  profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  createdAt: '2024-01-15T10:30:00Z',
  followersCount: 42,
  followingCount: 38
};

const userPlaylists = [
  {
    id: '1',
    slug: 'viagem-com-pai',
    title: 'Viagem com o Pai',
    situation: 'você tem que decidir entre viajar com seu pai ou com sua mãe',
    coverImage: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e',
    creator: {
      username: 'joaosilva',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    },
    tracksCount: 12,
    likesCount: 45
  },
  {
    id: '3',
    slug: 'festa-surpresa',
    title: 'Festa Surpresa',
    situation: 'você está organizando uma festa surpresa',
    coverImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    creator: {
      username: 'joaosilva',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    },
    tracksCount: 20,
    likesCount: 32
  },
  {
    id: '8',
    slug: 'viagem-de-carro',
    title: 'Viagem de Carro',
    situation: 'você está fazendo uma longa viagem de carro',
    coverImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
    creator: {
      username: 'joaosilva',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    },
    tracksCount: 25,
    likesCount: 67
  }
];

const likedPlaylists = [
  {
    id: '2',
    slug: 'termino-de-namoro',
    title: 'Superando um Término',
    situation: 'você acabou de terminar um relacionamento',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
    creator: {
      username: 'marialuiza'
    },
    tracksCount: 15,
    likesCount: 78
  },
  {
    id: '5',
    slug: 'primeiro-encontro',
    title: 'Primeiro Encontro',
    situation: 'você está indo para um primeiro encontro',
    coverImage: 'https://images.unsplash.com/photo-1522264437900-69a4c9e5ab33',
    creator: {
      username: 'lucasmendes'
    },
    tracksCount: 10,
    likesCount: 23
  }
];

export default function ProfilePage() {
  const isLoggedIn = true; // Simulando usuário logado para esta página
  const [activeTab, setActiveTab] = React.useState('playlists');
  
  return (
    <main className="min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho do Perfil */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-dark-700 flex-shrink-0">
            {userData.profileImage ? (
              <Image 
                src={userData.profileImage} 
                alt={userData.username}
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-ruby-600 text-white text-4xl font-bold">
                {userData.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">{userData.username}</h1>
            {userData.fullName && (
              <p className="text-gray-300 mb-4">{userData.fullName}</p>
            )}
            
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6">
              <div>
                <span className="text-white font-medium">{userPlaylists.length}</span>
                <span className="text-gray-400 ml-1">playlists</span>
              </div>
              <div>
                <span className="text-white font-medium">{userData.followersCount}</span>
                <span className="text-gray-400 ml-1">seguidores</span>
              </div>
              <div>
                <span className="text-white font-medium">{userData.followingCount}</span>
                <span className="text-gray-400 ml-1">seguindo</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <button className="btn-primary">
                Editar Perfil
              </button>
              <button className="btn-secondary">
                Compartilhar Perfil
              </button>
            </div>
          </div>
        </div>
        
        {/* Abas */}
        <div className="border-b border-dark-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('playlists')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'playlists'
                  ? 'border-ruby-500 text-ruby-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Minhas Playlists
            </button>
            <button
              onClick={() => setActiveTab('liked')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'liked'
                  ? 'border-ruby-500 text-ruby-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Playlists Curtidas
            </button>
          </nav>
        </div>
        
        {/* Conteúdo das Abas */}
        <div>
          {activeTab === 'playlists' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Minhas Playlists</h2>
                <Link href="/create" className="btn-primary">
                  Criar Nova Playlist
                </Link>
              </div>
              
              {userPlaylists.length === 0 ? (
                <div className="text-center py-12 bg-dark-800 rounded-lg border border-dark-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <h3 className="text-xl font-medium text-white mb-2">Nenhuma playlist criada</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Você ainda não criou nenhuma playlist. Crie sua primeira playlist para compartilhar com seus amigos.
                  </p>
                  <Link href="/create" className="btn-primary">
                    Criar Playlist
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {userPlaylists.map((playlist) => (
                    <PlaylistCard
                      key={playlist.id}
                      id={playlist.id}
                      slug={playlist.slug}
                      title={playlist.title}
                      situation={playlist.situation}
                      coverImage={playlist.coverImage}
                      creator={playlist.creator}
                      tracksCount={playlist.tracksCount}
                      likesCount={playlist.likesCount}
                    />
                  ))}
                </div>
              )}
            </>
          )}
          
          {activeTab === 'liked' && (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">Playlists Curtidas</h2>
              
              {likedPlaylists.length === 0 ? (
                <div className="text-center py-12 bg-dark-800 rounded-lg border border-dark-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-xl font-medium text-white mb-2">Nenhuma playlist curtida</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Você ainda não curtiu nenhuma playlist. Explore playlists e curta as que você gostar.
                  </p>
                  <Link href="/playlists" className="btn-primary">
                    Explorar Playlists
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {likedPlaylists.map((playlist) => (
                    <PlaylistCard
                      key={playlist.id}
                      id={playlist.id}
                      slug={playlist.slug}
                      title={playlist.title}
                      situation={playlist.situation}
                      coverImage={playlist.coverImage}
                      creator={playlist.creator}
                      tracksCount={playlist.tracksCount}
                      likesCount={playlist.likesCount}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-dark-900 border-t border-dark-700 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative">
                <div className="absolute -inset-1 bg-ruby-600 rotate-45 w-6 h-6 transform -translate-x-1 translate-y-1"></div>
                <span className="text-white font-bold text-xl relative z-10">Viber</span>
              </div>
              <span className="ml-4 text-gray-400">© 2025 Viber. Todos os direitos reservados.</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">Sobre</a>
              <a href="#" className="text-gray-400 hover:text-white">Termos</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-white">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

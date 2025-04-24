import React from 'react';
import Navbar from '../../components/Navbar';
import PlaylistCard from '../../components/PlaylistCard';
import Link from 'next/link';

// Dados de exemplo para demonstração
const playlists = [
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
    id: '3',
    slug: 'festa-surpresa',
    title: 'Festa Surpresa',
    situation: 'você está organizando uma festa surpresa',
    coverImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    creator: {
      username: 'pedrohenrique',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    },
    tracksCount: 20,
    likesCount: 32
  },
  {
    id: '4',
    slug: 'noite-de-estudos',
    title: 'Noite de Estudos',
    situation: 'você precisa estudar a noite toda para uma prova',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173',
    creator: {
      username: 'anaclara'
    },
    tracksCount: 18,
    likesCount: 56
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
  },
  {
    id: '6',
    slug: 'mudanca-de-cidade',
    title: 'Mudança de Cidade',
    situation: 'você está se mudando para uma nova cidade',
    coverImage: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b',
    creator: {
      username: 'gabrielasousa',
      profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    tracksCount: 14,
    likesCount: 41
  },
  {
    id: '7',
    slug: 'dia-de-chuva',
    title: 'Dia Chuvoso',
    situation: 'está chovendo e você está em casa',
    coverImage: 'https://images.unsplash.com/photo-1501691223387-dd0500403074',
    creator: {
      username: 'rafaelcosta'
    },
    tracksCount: 16,
    likesCount: 38
  },
  {
    id: '8',
    slug: 'viagem-de-carro',
    title: 'Viagem de Carro',
    situation: 'você está fazendo uma longa viagem de carro',
    coverImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
    creator: {
      username: 'isabelasantos',
      profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
    },
    tracksCount: 25,
    likesCount: 67
  },
  {
    id: '9',
    slug: 'treino-academia',
    title: 'Treino na Academia',
    situation: 'você está se exercitando na academia',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
    creator: {
      username: 'brunocarvalho'
    },
    tracksCount: 22,
    likesCount: 89
  },
  {
    id: '10',
    slug: 'trabalho-home-office',
    title: 'Trabalhando em Home Office',
    situation: 'você está trabalhando de casa',
    coverImage: 'https://images.unsplash.com/photo-1593642634367-d91a135587b5',
    creator: {
      username: 'carolinaoliveira',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
    },
    tracksCount: 18,
    likesCount: 52
  },
  {
    id: '11',
    slug: 'jantar-romantico',
    title: 'Jantar Romântico',
    situation: 'você está preparando um jantar romântico',
    coverImage: 'https://images.unsplash.com/photo-1529566652340-2c41a1eb6d93',
    creator: {
      username: 'felipesantos'
    },
    tracksCount: 15,
    likesCount: 76
  },
  {
    id: '12',
    slug: 'viagem-de-aviao',
    title: 'Viagem de Avião',
    situation: 'você está em um voo longo',
    coverImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05',
    creator: {
      username: 'marianaalmeida',
      profileImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04'
    },
    tracksCount: 30,
    likesCount: 64
  }
];

export default function PlaylistsPage() {
  const isLoggedIn = false; // Simulando usuário não logado para demonstração
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredPlaylists, setFilteredPlaylists] = React.useState(playlists);

  // Função para filtrar playlists com base no termo de busca
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredPlaylists(playlists);
    } else {
      const filtered = playlists.filter(
        playlist => 
          playlist.title.toLowerCase().includes(term.toLowerCase()) || 
          playlist.situation.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredPlaylists(filtered);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Todas as Playlists</h1>
          
          <div className="w-full md:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar playlists por título ou situação..."
                className="input-field pl-10 w-full md:w-80"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        
        {filteredPlaylists.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-300">Nenhuma playlist encontrada para "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 text-ruby-400 hover:text-ruby-300"
            >
              Limpar busca
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPlaylists.map((playlist) => (
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

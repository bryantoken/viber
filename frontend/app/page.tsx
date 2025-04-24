import React from 'react';
import Navbar from '../components/Navbar';
import PlaylistCard from '../components/PlaylistCard';
import Link from 'next/link';

// Dados de exemplo para demonstração
const featuredPlaylists = [
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
  }
];

const recentPlaylists = [
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
  }
];

export default function Home() {
  // Simulando usuário não logado para demonstração
  const isLoggedIn = false;

  return (
    <main className="min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Playlists para <span className="text-ruby-500">cada momento</span> da sua vida
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Descubra, crie e compartilhe playlists para situações específicas. 
            De momentos difíceis a celebrações, temos a trilha sonora perfeita.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/explore" className="btn-primary text-lg px-8 py-3">
              Explorar Playlists
            </Link>
            <Link href="/register" className="btn-secondary text-lg px-8 py-3">
              Criar Conta
            </Link>
          </div>
        </div>
        
        {/* Featured Playlists */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Playlists em Destaque</h2>
            <Link href="/playlists" className="text-ruby-400 hover:text-ruby-300">
              Ver todas
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPlaylists.map((playlist) => (
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
        </section>
        
        {/* Recent Playlists */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Adicionadas Recentemente</h2>
            <Link href="/playlists/recent" className="text-ruby-400 hover:text-ruby-300">
              Ver todas
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentPlaylists.map((playlist) => (
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
        </section>
        
        {/* Call to Action */}
        <section className="bg-gradient-to-r from-ruby-900 to-dark-800 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Crie sua própria playlist</h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-6">
            Compartilhe suas músicas favoritas para momentos específicos e conecte-se com pessoas que têm o mesmo gosto musical.
          </p>
          <Link href="/register" className="btn-primary text-lg px-8 py-3">
            Começar Agora
          </Link>
        </section>
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

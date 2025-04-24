import React from 'react';
import Navbar from '../../components/Navbar';
import TrackItem from '../../components/TrackItem';
import Comment from '../../components/Comment';
import Link from 'next/link';
import Image from 'next/image';

// Dados de exemplo para demonstração
const playlistData = {
  id: '1',
  slug: 'viagem-com-pai',
  title: 'Viagem com o Pai',
  situation: 'você tem que decidir entre viajar com seu pai ou com sua mãe',
  description: 'Uma playlist perfeita para aquele momento difícil quando você precisa escolher entre viajar com seu pai ou sua mãe. Músicas que vão te ajudar a refletir e tomar a melhor decisão.',
  coverImage: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e',
  creator: {
    id: '101',
    username: 'joaosilva',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
  },
  source: 'spotify',
  originalUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS',
  createdAt: '2025-03-15T14:30:00Z',
  updatedAt: '2025-04-10T09:15:00Z',
  tracksCount: 12,
  likesCount: 45,
  isLiked: false,
  tracks: [
    {
      id: '101',
      title: 'On The Road Again',
      artist: 'Willie Nelson',
      album: 'The Essential Willie Nelson',
      duration: 157,
      coverImage: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89',
      order: 1,
      url: 'https://open.spotify.com/track/3MV2Vc2nqvPSKsxR9lCJqE'
    },
    {
      id: '102',
      title: 'Highway to Hell',
      artist: 'AC/DC',
      album: 'Highway to Hell',
      duration: 208,
      coverImage: 'https://images.unsplash.com/photo-1461784180009-21121b2f204c',
      order: 2,
      url: 'https://open.spotify.com/track/2zYzyRzz6pRmhPzyfMEC8s'
    },
    {
      id: '103',
      title: 'Drive',
      artist: 'Incubus',
      album: 'Make Yourself',
      duration: 232,
      coverImage: 'https://images.unsplash.com/photo-1520116468816-95b69f847357',
      order: 3,
      url: 'https://open.spotify.com/track/7nnWIPM5hwE3DaUBkvOIpy'
    },
    {
      id: '104',
      title: 'Life is a Highway',
      artist: 'Tom Cochrane',
      album: 'Mad Mad World',
      duration: 267,
      coverImage: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b',
      order: 4,
      url: 'https://open.spotify.com/track/2Fs18NaCDuluPG1DHGw1XG'
    },
    {
      id: '105',
      title: 'Take Me Home, Country Roads',
      artist: 'John Denver',
      album: 'Poems, Prayers & Promises',
      duration: 191,
      coverImage: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e',
      order: 5,
      url: 'https://open.spotify.com/track/1vZ2vOkGlqj78aGjB5L9p8'
    }
  ],
  comments: [
    {
      id: '201',
      user: {
        id: '301',
        username: 'marialuiza',
        profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
      },
      text: 'Essa playlist me ajudou muito quando tive que escolher entre viajar com meu pai ou minha mãe no ano passado. Acabei escolhendo meu pai e foi incrível!',
      createdAt: '2025-03-20T18:45:00Z',
      replies: [
        {
          id: '202',
          user: {
            id: '101',
            username: 'joaosilva',
            profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
          },
          text: 'Que bom que ajudou! Criei essa playlist justamente pensando nesse dilema que muita gente passa.',
          createdAt: '2025-03-20T19:12:00Z'
        }
      ]
    },
    {
      id: '203',
      user: {
        id: '302',
        username: 'pedrohenrique',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
      },
      text: 'Adicionei mais algumas músicas na minha versão dessa playlist. Recomendo "Father and Son" do Cat Stevens!',
      createdAt: '2025-04-02T10:30:00Z',
      replies: []
    }
  ]
};

export default function PlaylistDetail({ params }: { params: { slug: string } }) {
  // Na implementação real, usaríamos o slug para buscar os dados da playlist da API
  const playlist = playlistData;
  const isLoggedIn = false; // Simulando usuário não logado para demonstração
  const [commentText, setCommentText] = React.useState('');

  return (
    <main className="min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header da Playlist */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="aspect-square relative rounded-lg overflow-hidden shadow-xl">
              {playlist.coverImage ? (
                <Image 
                  src={playlist.coverImage} 
                  alt={playlist.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-ruby-800 to-dark-700 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">{playlist.title.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{playlist.title}</h1>
              <p className="text-lg text-ruby-400 mb-4">Para quando: {playlist.situation}</p>
              <p className="text-gray-300 mb-6">{playlist.description}</p>
              
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-dark-600 overflow-hidden mr-3">
                  {playlist.creator.profileImage ? (
                    <Image 
                      src={playlist.creator.profileImage} 
                      alt={playlist.creator.username}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-ruby-600 text-white font-bold">
                      {playlist.creator.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-gray-300">Criado por</p>
                  <Link href={`/profile/${playlist.creator.id}`} className="text-white font-medium hover:text-ruby-400">
                    {playlist.creator.username}
                  </Link>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="text-gray-300">
                  <span className="text-white font-medium">{playlist.tracksCount}</span> músicas
                </div>
                <div className="text-gray-300">
                  <span className="text-white font-medium">{playlist.likesCount}</span> curtidas
                </div>
                <div className="text-gray-300">
                  Fonte: <span className="text-white font-medium capitalize">{playlist.source}</span>
                </div>
                <div className="text-gray-300">
                  Atualizado em <span className="text-white font-medium">
                    {new Date(playlist.updatedAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <a 
                href={playlist.originalUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ouvir no {playlist.source}
              </a>
              
              <button className={`flex items-center ${playlist.isLiked ? 'bg-ruby-600 text-white' : 'bg-dark-700 text-white'} px-4 py-2 rounded-md hover:bg-ruby-700 transition-colors`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${playlist.isLiked ? 'text-white' : 'text-ruby-500'}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                {playlist.isLiked ? 'Curtido' : 'Curtir'}
              </button>
              
              <button className="flex items-center bg-dark-700 text-white px-4 py-2 rounded-md hover:bg-dark-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Compartilhar
              </button>
            </div>
          </div>
        </div>
        
        {/* Lista de Músicas */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Músicas</h2>
          <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
            <div className="p-3 border-b border-dark-700 flex items-center text-gray-400 text-sm">
              <div className="w-8">#</div>
              <div className="ml-4 w-10"></div>
              <div className="ml-4 flex-1">Título</div>
              <div className="hidden md:block">Álbum</div>
              <div className="ml-4">Duração</div>
            </div>
            
            {playlist.tracks.map((track) => (
              <TrackItem
                key={track.id}
                title={track.title}
                artist={track.artist}
                album={track.album}
                duration={track.duration}
                coverImage={track.coverImage}
                order={track.order}
                url={track.url}
              />
            ))}
          </div>
        </div>
        
        {/* Seção de Comentários */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Comentários</h2>
          
          {/* Formulário de Comentário */}
          <div className="bg-dark-800 rounded-lg border border-dark-700 p-4 mb-8">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Deixe seu comentário sobre esta playlist..."
              className="input-field w-full mb-4"
              rows={3}
            />
            <div className="flex justify-end">
              <button 
                className="btn-primary"
                disabled={!commentText.trim() || !isLoggedIn}
              >
                {isLoggedIn ? 'Comentar' : 'Faça login para comentar'}
              </button>
            </div>
          </div>
          
          {/* Lista de Comentários */}
          <div>
            {playlist.comments.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                user={comment.user}
                text={comment.text}
                createdAt={comment.createdAt}
                replies={comment.replies}
              />
            ))}
          </div>
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

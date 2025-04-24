import React from 'react';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import Image from 'next/image';

export default function CreatePlaylistPage() {
  const isLoggedIn = true; // Simulando usuário logado para esta página
  
  return (
    <main className="min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Criar Nova Playlist</h1>
        
        <div className="bg-dark-800 rounded-lg border border-dark-700 p-6">
          <form className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-white font-medium mb-2">
                Título da Playlist
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Ex: Músicas para uma viagem de carro"
                className="input-field w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="situation" className="block text-white font-medium mb-2">
                Para qual situação?
              </label>
              <input
                type="text"
                id="situation"
                name="situation"
                placeholder="Ex: você está fazendo uma longa viagem de carro"
                className="input-field w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-white font-medium mb-2">
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Descreva sua playlist..."
                className="input-field w-full"
                rows={4}
              />
            </div>
            
            <div>
              <label htmlFor="source" className="block text-white font-medium mb-2">
                Fonte da Playlist
              </label>
              <select
                id="source"
                name="source"
                className="input-field w-full"
                required
              >
                <option value="">Selecione uma fonte</option>
                <option value="spotify">Spotify</option>
                <option value="youtube">YouTube</option>
                <option value="youtube_music">YouTube Music</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="originalUrl" className="block text-white font-medium mb-2">
                URL Original da Playlist
              </label>
              <input
                type="url"
                id="originalUrl"
                name="originalUrl"
                placeholder="Ex: https://open.spotify.com/playlist/..."
                className="input-field w-full"
                required
              />
              <p className="mt-2 text-sm text-gray-400">
                Cole o link da sua playlist do Spotify, YouTube ou YouTube Music
              </p>
            </div>
            
            <div>
              <label htmlFor="coverImage" className="block text-white font-medium mb-2">
                Imagem de Capa (opcional)
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-dark-700 rounded-md flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <input
                    type="url"
                    id="coverImage"
                    name="coverImage"
                    placeholder="URL da imagem de capa"
                    className="input-field w-full"
                  />
                  <p className="mt-2 text-sm text-gray-400">
                    Insira uma URL de imagem ou deixe em branco para usar a imagem da playlist original
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="flex justify-end space-x-4">
                <Link href="/playlists" className="btn-secondary">
                  Cancelar
                </Link>
                <button type="submit" className="btn-primary">
                  Criar Playlist
                </button>
              </div>
            </div>
          </form>
        </div>
        
        <div className="mt-12 bg-dark-800 rounded-lg border border-dark-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Adicionar Músicas Manualmente</h2>
          <p className="text-gray-300 mb-6">
            Você também pode adicionar músicas manualmente após criar a playlist. Isso é útil quando você quer personalizar ainda mais sua seleção.
          </p>
          
          <div className="bg-dark-700 rounded-lg p-4 text-center">
            <p className="text-gray-400">
              Primeiro crie a playlist, depois você poderá adicionar ou editar as músicas.
            </p>
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

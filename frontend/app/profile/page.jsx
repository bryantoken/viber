import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth, useAuthRedirect } from '../../hooks';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfilePage() {
  const { user, loading, isAuthenticated, updateProfile, logout } = useAuth();
  const { authChecked } = useAuthRedirect(true); // Requer autenticação
  const router = useRouter();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome_completo: '',
    foto_perfil: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('playlists');

  // Inicializar o formulário quando o usuário for carregado
  useEffect(() => {
    if (user) {
      setFormData({
        nome_completo: user.nome_completo || '',
        foto_perfil: user.foto_perfil || ''
      });
    }
  }, [user]);

  // Manipulador de mudança de formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpar erro do campo quando o usuário começa a digitar
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  // Validar formulário
  const validateForm = () => {
    const errors = {};
    
    if (formData.foto_perfil && !isValidUrl(formData.foto_perfil)) {
      errors.foto_perfil = 'URL de imagem inválida';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Verificar se uma string é uma URL válida
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Manipulador de envio de formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await updateProfile(formData);
      
      if (success) {
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manipulador de logout
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Mostrar tela de carregamento enquanto verifica autenticação
  if (loading || !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-ruby-500 mx-auto"></div>
          <p className="mt-4 text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar isLoggedIn={true} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho do Perfil */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-dark-700 flex-shrink-0">
            {user?.foto_perfil ? (
              <Image 
                src={user.foto_perfil} 
                alt={user.username}
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-ruby-600 text-white text-4xl font-bold">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nome_completo" className="block text-white font-medium mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="nome_completo"
                    name="nome_completo"
                    value={formData.nome_completo}
                    onChange={handleChange}
                    className="input-field w-full md:w-96"
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <label htmlFor="foto_perfil" className="block text-white font-medium mb-2">
                    URL da Foto de Perfil
                  </label>
                  <input
                    type="text"
                    id="foto_perfil"
                    name="foto_perfil"
                    value={formData.foto_perfil}
                    onChange={handleChange}
                    className={`input-field w-full md:w-96 ${formErrors.foto_perfil ? 'border-red-500' : ''}`}
                    placeholder="https://exemplo.com/sua-foto.jpg"
                  />
                  {formErrors.foto_perfil && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.foto_perfil}</p>
                  )}
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-white mb-2">{user?.username}</h1>
                {user?.nome_completo && (
                  <p className="text-gray-300 mb-4">{user.nome_completo}</p>
                )}
                
                <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6">
                  <div>
                    <span className="text-white font-medium">{user?.playlists?.length || 0}</span>
                    <span className="text-gray-400 ml-1">playlists</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">{user?.followers_count || 0}</span>
                    <span className="text-gray-400 ml-1">seguidores</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">{user?.following_count || 0}</span>
                    <span className="text-gray-400 ml-1">seguindo</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <button 
                    className="btn-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Editar Perfil
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={handleLogout}
                  >
                    Sair
                  </button>
                </div>
              </>
            )}
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
              
              {(!user?.playlists || user.playlists.length === 0) ? (
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
                  {/* Aqui seriam renderizados os cards de playlist do usuário */}
                  <p className="text-gray-400 col-span-full">Carregando suas playlists...</p>
                </div>
              )}
            </>
          )}
          
          {activeTab === 'liked' && (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">Playlists Curtidas</h2>
              
              {(!user?.liked_playlists || user.liked_playlists.length === 0) ? (
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
                  {/* Aqui seriam renderizados os cards de playlist curtidas pelo usuário */}
                  <p className="text-gray-400 col-span-full">Carregando playlists curtidas...</p>
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

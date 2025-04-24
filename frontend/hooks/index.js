import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePlaylist } from '../contexts/PlaylistContext';
import { useRouter } from 'next/router';

// Hook para integrar a autenticação com o roteamento
export const useAuthRedirect = (requireAuth = true) => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !isAuthenticated) {
        // Redirecionar para login se a página requer autenticação
        router.push('/login');
      } else if (!requireAuth && isAuthenticated) {
        // Redirecionar para home se o usuário já está autenticado (ex: página de login)
        router.push('/');
      } else {
        setAuthChecked(true);
      }
    }
  }, [loading, isAuthenticated, requireAuth, router]);

  return { user, loading, isAuthenticated, authChecked };
};

// Hook para buscar e gerenciar playlists
export const usePlaylists = (initialParams = {}) => {
  const { fetchPlaylists, playlists, loading, error } = usePlaylist();
  const [params, setParams] = useState(initialParams);

  useEffect(() => {
    fetchPlaylists(params);
  }, [params]);

  const updateParams = (newParams) => {
    setParams({ ...params, ...newParams });
  };

  return { playlists, loading, error, updateParams };
};

// Hook para buscar e gerenciar uma playlist específica
export const usePlaylistDetail = (slug) => {
  const { fetchPlaylist, currentPlaylist, loading, error, likePlaylist, unlikePlaylist, addComment } = usePlaylist();

  useEffect(() => {
    if (slug) {
      fetchPlaylist(slug);
    }
  }, [slug]);

  return { 
    playlist: currentPlaylist, 
    loading, 
    error, 
    likePlaylist: () => likePlaylist(slug),
    unlikePlaylist: () => unlikePlaylist(slug),
    addComment: (commentData) => addComment(slug, commentData)
  };
};

// Hook para gerenciar formulários
export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, setErrors, handleChange, resetForm, setValues };
};

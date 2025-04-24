import { createContext, useState, useContext } from 'react';
import { playlistApi, trackApi } from '../services/api';

// Criando o contexto de playlists
const PlaylistContext = createContext(null);

// Hook personalizado para usar o contexto de playlists
export const usePlaylist = () => useContext(PlaylistContext);

// Provedor de playlists
export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para buscar todas as playlists
  const fetchPlaylists = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await playlistApi.getPlaylists(params);
      setPlaylists(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Erro ao buscar playlists.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar uma playlist específica
  const fetchPlaylist = async (slug) => {
    try {
      setLoading(true);
      setError(null);
      const response = await playlistApi.getPlaylist(slug);
      setCurrentPlaylist(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Erro ao buscar playlist.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Função para criar uma nova playlist
  const createPlaylist = async (playlistData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await playlistApi.createPlaylist(playlistData);
      setPlaylists([...playlists, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Erro ao criar playlist.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar uma playlist
  const updatePlaylist = async (slug, playlistData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await playlistApi.updatePlaylist(slug, playlistData);
      
      // Atualizar a lista de playlists
      setPlaylists(playlists.map(playlist => 
        playlist.slug === slug ? response.data : playlist
      ));
      
      // Atualizar a playlist atual se for a mesma
      if (currentPlaylist && currentPlaylist.slug === slug) {
        setCurrentPlaylist(response.data);
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Erro ao atualizar playlist.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir uma playlist
  const deletePlaylist = async (slug) => {
    try {
      setLoading(true);
      setError(null);
      await playlistApi.deletePlaylist(slug);
      
      // Remover da lista de playlists
      setPlaylists(playlists.filter(playlist => playlist.slug !== slug));
      
      // Limpar a playlist atual se for a mesma
      if (currentPlaylist && currentPlaylist.slug === slug) {
        setCurrentPlaylist(null);
      }
      
      return true;
    } catch (err) {
      setError(err.response?.data || 'Erro ao excluir playlist.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Função para curtir uma playlist
  const likePlaylist = async (slug) => {
    try {
      setError(null);
      await playlistApi.likePlaylist(slug);
      
      // Atualizar a playlist atual se for a mesma
      if (currentPlaylist && currentPlaylist.slug === slug) {
        setCurrentPlaylist({
          ...currentPlaylist,
          likesCount: currentPlaylist.likesCount + 1,
          userLiked: true
        });
      }
      
      return true;
    } catch (err) {
      setError(err.response?.data || 'Erro ao curtir playlist.');
      return false;
    }
  };

  // Função para descurtir uma playlist
  const unlikePlaylist = async (slug) => {
    try {
      setError(null);
      await playlistApi.unlikePlaylist(slug);
      
      // Atualizar a playlist atual se for a mesma
      if (currentPlaylist && currentPlaylist.slug === slug) {
        setCurrentPlaylist({
          ...currentPlaylist,
          likesCount: currentPlaylist.likesCount - 1,
          userLiked: false
        });
      }
      
      return true;
    } catch (err) {
      setError(err.response?.data || 'Erro ao remover curtida da playlist.');
      return false;
    }
  };

  // Função para adicionar um comentário
  const addComment = async (slug, commentData) => {
    try {
      setError(null);
      const response = await playlistApi.commentPlaylist(slug, commentData);
      
      // Atualizar a playlist atual se for a mesma
      if (currentPlaylist && currentPlaylist.slug === slug) {
        setCurrentPlaylist({
          ...currentPlaylist,
          comments: [...currentPlaylist.comments, response.data]
        });
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Erro ao adicionar comentário.');
      return null;
    }
  };

  // Função para adicionar uma música à playlist
  const addTrack = async (trackData) => {
    try {
      setError(null);
      const response = await trackApi.createTrack(trackData);
      
      // Atualizar a playlist atual se for a mesma
      if (currentPlaylist && currentPlaylist.id === trackData.playlist) {
        setCurrentPlaylist({
          ...currentPlaylist,
          tracks: [...currentPlaylist.tracks, response.data],
          tracksCount: currentPlaylist.tracksCount + 1
        });
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Erro ao adicionar música.');
      return null;
    }
  };

  const value = {
    playlists,
    currentPlaylist,
    loading,
    error,
    fetchPlaylists,
    fetchPlaylist,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    likePlaylist,
    unlikePlaylist,
    addComment,
    addTrack
  };

  return <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>;
};

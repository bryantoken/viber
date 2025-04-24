import axios from 'axios';

// Configuração base do axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com erros de resposta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Se o erro for 401 (não autorizado) e não for uma tentativa de refresh
    if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== 'token/refresh/') {
      originalRequest._retry = true;
      
      try {
        // Tentar renovar o token
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        
        const response = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh: refreshToken
        });
        
        if (response.data.access) {
          localStorage.setItem('token', response.data.access);
          api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Se falhar ao renovar o token, redirecionar para login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// API de usuários
export const userApi = {
  register: (userData) => api.post('users/', userData),
  login: (credentials) => api.post('token/', credentials),
  getProfile: () => api.get('users/me/'),
  updateProfile: (userData) => api.patch('users/me/', userData),
  getUser: (userId) => api.get(`users/${userId}/`),
  follow: (userId) => api.post(`users/${userId}/follow/`),
  unfollow: (userId) => api.post(`users/${userId}/unfollow/`),
  getFollowers: (userId) => api.get(`users/${userId}/followers/`),
  getFollowing: (userId) => api.get(`users/${userId}/following/`),
};

// API de playlists
export const playlistApi = {
  getPlaylists: (params) => api.get('playlists/', { params }),
  getPlaylist: (slug) => api.get(`playlists/${slug}/`),
  createPlaylist: (playlistData) => api.post('playlists/', playlistData),
  updatePlaylist: (slug, playlistData) => api.patch(`playlists/${slug}/`, playlistData),
  deletePlaylist: (slug) => api.delete(`playlists/${slug}/`),
  likePlaylist: (slug) => api.post(`playlists/${slug}/like/`),
  unlikePlaylist: (slug) => api.post(`playlists/${slug}/unlike/`),
  getPlaylistLikes: (slug) => api.get(`playlists/${slug}/likes/`),
  commentPlaylist: (slug, commentData) => api.post(`playlists/${slug}/comment/`, commentData),
};

// API de músicas
export const trackApi = {
  getTracks: (params) => api.get('tracks/', { params }),
  createTrack: (trackData) => api.post('tracks/', trackData),
  updateTrack: (trackId, trackData) => api.patch(`tracks/${trackId}/`, trackData),
  deleteTrack: (trackId) => api.delete(`tracks/${trackId}/`),
};

// API de comentários
export const commentApi = {
  getComments: (params) => api.get('comments/', { params }),
  createComment: (commentData) => api.post('comments/', commentData),
  updateComment: (commentId, commentData) => api.patch(`comments/${commentId}/`, commentData),
  deleteComment: (commentId) => api.delete(`comments/${commentId}/`),
};

export default api;

import { createContext, useState, useEffect, useContext } from 'react';
import { userApi } from '../services/api';

// Criando o contexto de autenticação
const AuthContext = createContext(null);

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);

// Provedor de autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const response = await userApi.getProfile();
          setUser(response.data);
        } catch (err) {
          console.error('Erro ao verificar autenticação:', err);
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Função para login
  const login = async (email, password) => {
    try {
      setError(null);
      const response = await userApi.login({ email, password });
      
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      
      const userResponse = await userApi.getProfile();
      setUser(userResponse.data);
      
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || 'Erro ao fazer login. Verifique suas credenciais.');
      return false;
    }
  };

  // Função para registro
  const register = async (userData) => {
    try {
      setError(null);
      await userApi.register(userData);
      
      // Fazer login automaticamente após o registro
      return await login(userData.email, userData.password);
    } catch (err) {
      setError(err.response?.data || 'Erro ao criar conta. Tente novamente.');
      return false;
    }
  };

  // Função para logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  // Função para atualizar perfil
  const updateProfile = async (userData) => {
    try {
      setError(null);
      const response = await userApi.updateProfile(userData);
      setUser(response.data);
      return true;
    } catch (err) {
      setError(err.response?.data || 'Erro ao atualizar perfil. Tente novamente.');
      return false;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

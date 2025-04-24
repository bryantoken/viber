import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

// Hook para integrar a autenticação com o roteamento
export const useAuthRedirect = (requireAuth = true) => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [authChecked, setAuthChecked] = React.useState(false);

  React.useEffect(() => {
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

// Hook para gerenciar formulários
export const useForm = (initialValues = {}) => {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});

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

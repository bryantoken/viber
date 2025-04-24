import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { register, error } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Limpar erro do campo quando o usuário começa a digitar
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.username.trim()) {
      errors.username = 'Nome de usuário é obrigatório';
    } else if (formData.username.length < 3) {
      errors.username = 'Nome de usuário deve ter pelo menos 3 caracteres';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      errors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      errors.password = 'Senha deve ter pelo menos 8 caracteres';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem';
    }
    
    if (!formData.terms) {
      errors.terms = 'Você deve concordar com os termos de serviço';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      };
      
      const success = await register(userData);
      
      if (success) {
        router.push('/');
      }
    } catch (err) {
      console.error('Erro ao criar conta:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar isLoggedIn={false} />
      
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-block relative mb-4">
            <div className="absolute -inset-1 bg-ruby-600 rotate-45 w-10 h-10 transform -translate-x-1 translate-y-1"></div>
            <span className="text-white font-bold text-3xl relative z-10">Viber</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Crie sua conta</h1>
        </div>
        
        <div className="bg-dark-800 rounded-lg border border-dark-700 p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-800 rounded-md text-white">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-white font-medium mb-2">
                Nome de usuário
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="seunome"
                className={`input-field w-full ${formErrors.username ? 'border-red-500' : ''}`}
                value={formData.username}
                onChange={handleChange}
                required
              />
              {formErrors.username && (
                <p className="mt-1 text-sm text-red-500">{formErrors.username}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-white font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="seu@email.com"
                className={`input-field w-full ${formErrors.email ? 'border-red-500' : ''}`}
                value={formData.email}
                onChange={handleChange}
                required
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-white font-medium mb-2">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                className={`input-field w-full ${formErrors.password ? 'border-red-500' : ''}`}
                value={formData.password}
                onChange={handleChange}
                required
              />
              {formErrors.password ? (
                <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
              ) : (
                <p className="mt-1 text-sm text-gray-400">
                  Mínimo de 8 caracteres, incluindo letras e números
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-white font-medium mb-2">
                Confirmar senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                className={`input-field w-full ${formErrors.confirmPassword ? 'border-red-500' : ''}`}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {formErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{formErrors.confirmPassword}</p>
              )}
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className={`h-4 w-4 text-ruby-600 focus:ring-ruby-500 border-dark-600 rounded ${formErrors.terms ? 'border-red-500' : ''}`}
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                Eu concordo com os{' '}
                <a href="#" className="text-ruby-400 hover:text-ruby-300">
                  Termos de Serviço
                </a>{' '}
                e{' '}
                <a href="#" className="text-ruby-400 hover:text-ruby-300">
                  Política de Privacidade
                </a>
              </label>
            </div>
            {formErrors.terms && (
              <p className="mt-1 text-sm text-red-500">{formErrors.terms}</p>
            )}
            
            <div>
              <button
                type="submit"
                className="btn-primary w-full py-3 flex justify-center items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Criando conta...
                  </>
                ) : (
                  'Criar conta'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-800 text-gray-400">Ou continue com</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-dark-600 rounded-md shadow-sm bg-dark-700 text-sm font-medium text-white hover:bg-dark-600"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-dark-600 rounded-md shadow-sm bg-dark-700 text-sm font-medium text-white hover:bg-dark-600"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-gray-300">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-ruby-400 hover:text-ruby-300 font-medium">
              Entrar
            </Link>
          </p>
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

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth, useAuthRedirect } from '../../hooks';
import Navbar from '../../components/Navbar';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        setIsChecking(false);
      }
    }
  }, [isAuthenticated, loading, router]);

  if (loading || isChecking) {
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
    <>
      <Navbar isLoggedIn={true} />
      {children}
    </>
  );
}

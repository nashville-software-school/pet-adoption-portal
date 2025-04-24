import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import type { ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  if (!currentUser) {
    return null; // Will redirect in the useEffect
  }

  return <>{children}</>;
};

export default PrivateRoute;

import { useEffect, useState } from 'react';
import Loader from './Loader';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent: React.ComponentType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AuthHOC = (props: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem('auth.token');
      const minLoadingTime = 2000; 
      
      const checkAuth = () => {
        if (!token) {
          router.push('/');
        } else {
          setIsLoading(false);
        }
      };

      const timer = setTimeout(checkAuth, minLoadingTime);

      return () => clearTimeout(timer);
    }, [router]);

    if (isLoading) {
      return <Loader />; 
    }

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
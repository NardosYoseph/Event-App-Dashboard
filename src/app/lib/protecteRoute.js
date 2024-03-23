// ProtectedRoute.js (HOC for protecting routes based on user role)

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ allowedRoles, children }) => {
 
  const router = useRouter();
 
  const role = localStorage.getItem('role');
  useEffect(() => {
   if (!allowedRoles.includes(role)) {
      
      router.push('/dashboard');
    }
  }, []);

  

  return children;
};

export default ProtectedRoute;

import { Navigate } from 'react-router-dom';

import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  if (!auth.user) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export { ProtectedRoute };

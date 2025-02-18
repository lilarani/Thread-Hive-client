import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './../hooks/useAuth';

const PrivetRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-bars loading-lg">Loading...</span>;
  }

  if (user && user?.email) {
    return children;
  }
  <Navigate to={'/login'} state={{ from: location }} replace></Navigate>;
};

export default PrivetRouter;

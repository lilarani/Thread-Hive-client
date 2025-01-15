import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';

const AdminRouter = ({ children }) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <span className="loading loading-bars loading-lg">Loading...</span>;
  }
  if (user && isAdmin) {
    return children;
  }
  <Navigate to={'/login'} state={{ from: location }} replace></Navigate>;
};

export default AdminRouter;

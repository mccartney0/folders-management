import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../store/auth';


const PrivateRoute = () => {
  const { token } = useSelector(useAuth);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
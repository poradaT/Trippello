import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const PrivateRoutes = ({ redirectTo }) => {
  const { isLoadingUser, user } = useAuth();
  const navigate = useNavigate();

  if (isLoadingUser || !user) return <p>Loading ...</p>;

  return user ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoutes;

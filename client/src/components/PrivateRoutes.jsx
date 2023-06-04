import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const PrivateRoutes = ({ redirectTo }) => { 
  const { isLoadingUser, user } = useAuth();
  const navigate = useNavigate(); 

  if (isLoadingUser) return <p>Loading ...</p>;

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={redirectTo} replace={true} /> 
  );
};

export default PrivateRoutes;

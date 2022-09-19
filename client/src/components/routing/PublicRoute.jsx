// Import libraries
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  if (localStorage.getItem("authToken")) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;

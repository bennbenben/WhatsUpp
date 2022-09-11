// Import libraries
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

// Import internal components
import { Store } from "../../data/Store";

const PublicRoute = () => {
  const [globalState, dispatch] = useContext(Store);
  const { currentUser: { userId } } = globalState;

  if (userId) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />
}

export default PublicRoute;

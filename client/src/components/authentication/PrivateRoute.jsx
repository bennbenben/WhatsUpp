import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Store } from "../../data/Store";

const PrivateRoute = () => {
  const [globalState, dispatch] = useContext(Store);
  const { currentUser } = globalState;

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};


// const PrivateRoute = () => {
//   return localStorage.getItem("authToken") ? <Outlet /> : <Navigate to="/login" />;
// };

export default PrivateRoute;


import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [globalState, dispatch] = useContext(Store);
  const { currentUser } = globalState;

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;

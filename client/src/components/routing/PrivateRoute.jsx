// Import libraries
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

// Import internal components
import { Store } from "../../data/Store";
import { userLoginSuccess, userLogout } from "../../data/Actions";
import { useEffect } from "react";

const PrivateRoute = () => {
  const [globalState, dispatch] = useContext(Store);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const base64Payload = JSON.stringify(authToken).split(".")[1];
    const currentUser = JSON.parse(window.atob(base64Payload));
    console.log("currentUser in privateroute: ", currentUser);

    const expiryDate = new Date(currentUser.exp * 1000);
    const currentDate = new Date(Date.now());

    if ( expiryDate <= currentDate ) {
      localStorage.removeItem("authToken");
      dispatch(userLogout());
      alert("token expired. please login again");
    }
    
    dispatch(userLoginSuccess(currentUser));
    console.log('dispatch from Private route happened')
  },[]);

  // If first time login, - JWT dont exist, context dont exist, navigate them to /login
  if (!localStorage.getItem("authToken")) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

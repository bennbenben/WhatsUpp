// Import libraries
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

// Import internal components
import { Store } from "../../data/Store";
import { userLoginSuccess, userLogout } from "../../data/Actions";
import { useEffect } from "react";

const PrivateRoute = () => {
  const [globalState, dispatch] = useContext(Store);
  const { currentUser: { userId } } = globalState;

  // assign variables
  
  // if (authToken) {
  //   const base64Payload = JSON.stringify(authToken).split(".")[1];
  //   const currentUser = JSON.parse(window.atob(base64Payload));
  //   const { exp } = currentUser;
  //   console.log("exp is: ", exp); // 1662879164
  //   const now = Math.round(Date.now()/1000); 
  //   console.log('now is: ', now); //1662880021

  //   // Case 1 : authToken expired
  //   if (now > exp ) {
  //     localStorage.removeItem("authToken");
  //     // dispatch(userLogout());
  //     return <Navigate to="/login" replace />;
  //   }
  //   //Case 2: authToken not expired && userId === null (user has refreshed the page)
  //   if (userId === null ) {
  //       dispatch(userLoginSuccess(currentUser));
  //     };
  //   }

  // If first time login, - JWT dont exist, context dont exist, navigate them to /login
  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};


// const PrivateRoute = () => {
//   return localStorage.getItem("authToken") ? <Outlet /> : <Navigate to="/login" />;
// };

export default PrivateRoute;

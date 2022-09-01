import { useEffect, useState } from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [auth, setAuth] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setAuth(true);
    }
  }, []);

  console.log("auth is: ", auth);

  // -------------------------------------------------

  // const [auth, setAuth] = useState(false);

  // useEffect(() => {
  //   console.log(localStorage.getItem("authToken"));
  //   const auth_token = JSON.parse(JSON.stringify(localStorage.getItem("authToken")));
  //   if (auth_token) {
  //    setAuth(true);
  //   }
  // }, []);

  // const auth = useAuth();
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  // return auth ? <Navigate to="/hello" /> : <Navigate to="/login" />;

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

// import { Navigate, Route } from "react-router-dom";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         localStorage.getItem("authToken") ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/login" />
//         );
//       }}
//     />
//   );
// };

// export default PrivateRoute;

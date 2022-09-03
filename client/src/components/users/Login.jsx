import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../Reducer";
import jwt_decode from "jwt-decode";
import { DateTime } from "luxon";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{}, dispatch] = useStateValue();
  // const [token, setToken] = useState(localStorage.getItem("authToken"));
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem("authToken")) {
  //     dispatch({
  //       type: actionTypes.SET_USER,
  //       user: result.user
  //     });
  //   }
  // }, []);

    // if (localStorage.getItem("authToken")) {
    //   console.log("this is working");
    //   navigate("/");
    // }

  const loginHandler = async (e) => {
    e.preventDefault();

    // let result = {
    //   key1: "blabla",
    //   key2: "blabla2",
    //   user: {
    //     name: "Bobo Tangina",
    //     // this key need to change to render user display name
    //     displayName: "Bobo Tan",
    //     email: "bobotan@gmail.com",
    //     // this key need to change in Sidebar.jsx to render user profile
    //     photoURL: "myphotourl.com"
    //   }
    // }

    const axiosConfig = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "/api/v1/login", { email, password }, axiosConfig
      );
      console.log(`response.data: ${response.data}`);

      // maybe dont need to store the local token, just store it as state?
      localStorage.setItem("authToken", response.data.token);

      // decode the token & check if expired
      // need to add more data to token payload, for rendering of the chat
      const token = localStorage.getItem('authToken')
      const user = jwt_decode(token)
      const now = DateTime.now().toUnixInteger()
      console.log('user payload',user)

      if (user.exp > now) {
      }
      // and dispatch payload from token

      dispatch({
        type: actionTypes.SET_USER,
        user: user
        // user: result.user
      })
      
      
      // setToken(response.data.token);
      // navigate("/");
      
    } catch (error) {
      // console.log(`error: ${error}`);
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login">
    <div className="login__container">
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt=""/>
      <div className="login__text"><h1>Sign in to Whatsupp</h1></div>
      <form className="login-view__form" onSubmit={loginHandler}>
        <div className="form-group">
          {error && <span className="error-message">{error}</span>}
          <label htmlFor="email">Email:</label>
          <input type="email" required id="email" placeholder="Enter email here" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" required id="password" placeholder="Enter password here" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary">Login</button>

        <span className="login-view__subtext">
          Do not have an account?
          <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
    </div>
  );
};

export default Login;

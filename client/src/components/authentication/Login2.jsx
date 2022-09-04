import {useState, useEffect, useContext} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { initUserLogin, userLoginSuccess, userLoginFailure } from "../../data/Actions";
import { Store } from "../../data/Store";

const Login2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [globalState, dispatch] = useContext(Store);

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(initUserLogin());

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
  try {
    const response = await axios.post("/api/v1/login", { email, password }, axiosConfig);
    console.log(`response.data: ${JSON.stringify(response.data)}`);
    localStorage.setItem("authToken", response.data.token);
    dispatch(userLoginSuccess(response.data.token));
    const { currentUser } = globalState;
    console.log("currentUser is: ", JSON.stringify(currentUser));
    console.log("current context is: ", JSON.stringify(globalState));
    navigate("/");

  } catch (error) {
    setError(error.response.data.error);
    setTimeout(() => {
      setError("");
    }, 5000);
    dispatch(userLoginFailure());
    };
  };
  
  return (
    <div className="login-page__container">
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" />

      <div className="login-page__title">
        <h1>Sign in to Whats Upp</h1>
      </div>

      <form className="login-page__form" onSubmit={loginHandler}>

        {error && <span className="error-message">{error}</span>}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" required id="email" placeholder="Enter email here" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" required id="password" placeholder="Enter password here" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <span className="login-view__subtext">
          Do not have an account?
          <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login2;

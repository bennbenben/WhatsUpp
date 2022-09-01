import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const [token, setToken] = useState(localStorage.getItem("authToken"));
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, []);

    // if (localStorage.getItem("authToken")) {
    //   console.log("this is working");
    //   navigate("/");
    // }

  const loginHandler = async (e) => {
    e.preventDefault();

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
      localStorage.setItem("authToken", response.data.token);
      
      // setToken(response.data.token);
      navigate("/");
      
    } catch (error) {
      // console.log(`error: ${error}`);
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-view">
      <form className="login-view__form" onSubmit={loginHandler}>
        <h3 className="login-view__title">Login</h3>

        {error && <span className="error-message">{error}</span>}

        <div className="form-group">
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
  );
};

export default Login;

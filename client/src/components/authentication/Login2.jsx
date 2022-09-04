import { useState, useEffect, useNavigate } from "react-router-dom";
import axios from "axios";

const Login2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  };

  try {
    
  } catch (error) {
    
  }

  return (
    <div className="login-page__container">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt=""
      />

      <div className="login-page__title">
        <h1>Sign in to Whats Upp</h1>
      </div>

      <form className="login-page__form" onSubmit={loginHandler}>
        {error && <span className="error-message">{error}</span>}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Enter email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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

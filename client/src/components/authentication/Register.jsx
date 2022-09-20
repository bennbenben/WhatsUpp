// Import libraries
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Import internal components
import "./AuthForm.css";
import { Store } from "../../data/Store";
import { setLoadingFalse, setLoadingTrue, userLoginSuccess } from "../../data/Actions";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");
  const [globalState, dispatch] = useContext(Store);
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoadingTrue());

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmpassword("");
      dispatch(setLoadingFalse());
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      // Retrieve JWT token from BE server (as means of authentication)
      const response = await axios.post( "/api/v1/register", { username, email, password }, axiosConfig);
      console.log("registerHandler response: ", response);
      dispatch(setLoadingFalse());
      alert("registered user successfully")
      navigate("/login");
      
    } catch (error) {
      dispatch(setLoadingFalse());
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
      
    }
  };

  return (
    <div className="login-page__main">
      <div className="login-page__container">
        <img src="/fakewhatsapp.png" alt="" />

        <div className="login-page__title">
          <h1>Register</h1>
        </div>

        <form className="login-page__form" onSubmit={registerHandler}>

          {error && <span className="error-message">{error}</span>}

          <div className="form-group">
            <label htmlFor="name">Username:</label>
            <input type="text" required id="name" placeholder="Enter username here" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" required id="email" placeholder="Enter email here" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" required id="password" placeholder="Enter password here" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="confirmpassword">Confirm Password:</label>
            <input type="password" required id="confirmpassword" placeholder="Confirm password here" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} />
          </div>

          <button type="submit" className="btn btn-primary">Register</button>

          <div className="login-view__subtext">
            Already have an account?
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
// Import libraries
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Import internal components
import "./Register.css";
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
      console.log("this is registration response: ", response);
      dispatch(setLoadingFalse());
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
    <div className="register-page__main">
      <div className="register-page__container">
        <form className="register-page__form" onSubmit={registerHandler}>
          <h3 className="register-page__title">Register</h3>

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
            <label htmlFor="confirmpassword">Password:</label>
            <input type="password" required id="confirmpassword" placeholder="Confirm password here" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} />
          </div>

          <button type="submit" className="btn btn-primary">Register & Login</button>

          <span className="register-page__subtext">
            Already have an account?
            <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken"))
      navigate("/helloworld");
    }, [navigate]);

  const registerHandler = async (e) => {
    e.preventDefault();

    const axiosConfig = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmpassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const response = await axios.post(
        "/api/v1/register", { username, email, password }, axiosConfig
      );
    //   console.log(`response.data: ${response.data}`);
      localStorage.setItem("authToken", response.data.token);
      navigate("/helloworld");
      
    } catch (error) {
      // console.log(`error: ${error}`);
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="register-view">
      <form className="register-view__form" onSubmit={registerHandler}>
        <h3 className="register-view__title">Register</h3>

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

        <button type="submit" className="btn btn-primary">Register</button>

        <span className="register-view__subtext">
          Already have an account?
          <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;

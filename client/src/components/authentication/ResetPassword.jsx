// Import libraries
import { useState, useContext } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Import internal components
import { Store } from "../../data/Store";
import { setLoadingTrue, setLoadingFalse } from "../../data/Actions";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [globalState, dispatch] = useContext(Store);
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const resetPasswordHandler = async (e) => {
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
      setTimeout(() => {
        setError("");
      }, 5000);
      dispatch(setLoadingFalse());
      return setError("Passwords do not match");
    };

    try {
      const response = await axios.post(`/api/v1/resetpassword/${resetToken}`, { password }, axiosConfig);
      console.log(`reponse.data is: ${JSON.stringify(response.data)}`);
      setSuccess(response.data);
      dispatch(setLoadingFalse());
      navigate("/");

    } catch (error) {
      setError(error.response.data.error);
      setPassword("");
      setConfirmpassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      dispatch(setLoadingFalse());
    };
  };

  return (
    <div className="resetpassword-page__container">

      <div className="resetpassword-page__title">
        <h1>Forgot Password</h1>
      </div>

      <form className="resetpassword-page__form" onSubmit={resetPasswordHandler}>

        {error && <span className="error-message">{error}</span>}
        {success && 
        <span className="success-message">
          {success} <Link to="/login">Login</Link>
          </span>
        }

        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input type="password" required id="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm New Password:</label>
          <input type="password" required id="confirmpassword" placeholder="Confirm new password" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary">Reset Password</button>

      </form>
    </div>
  );
}

export default ResetPassword;
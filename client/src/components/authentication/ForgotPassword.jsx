// Import libraries
import { useState, useContext } from "react";
import axios from "axios";

// Import internal components
import "./ForgotPassword.css";
import { Store } from "../../data/Store";
import { setLoadingFalse, setLoadingTrue } from "../../data/Actions";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [globalState, dispatch] = useContext(Store);

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoadingTrue());

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // API request to reset password
      const response = await axios.post("/api/v1/forgotpassword", { email }, axiosConfig);
      console.log(`response data: ${response.data.description}`);
      setSuccess(response.data.description);
      
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    };

    dispatch(setLoadingFalse());
  };

  return (
    <div className="forgotpassword-page__main">

      <div className="forgotpassword-page__container">

        <div className="forgotpassword-page__title">
          <h1>Forgot Password</h1>
        </div>

        <form className="forgotpassword-page__form" onSubmit={forgotPasswordHandler}>

          {error && <span className="error-message">{error}</span>}
          {success && <span className="success-message">{success}</span>}

          <span className="forgotpassword-view__subtext">
            Enter the email that you have registered the account with. We will send u a reset password email
          </span>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" required id="email" placeholder="Enter email here" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <button type="submit" className="btn btn-primary">Send email</button>

        </form>

      </div>
    </div>
  );
};

export default ForgotPassword;

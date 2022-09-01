import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Private = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    } else {
      console.log("authToken is: ", localStorage.getItem("authToken"));
    }

    const fetchPrivateData = async () => {
      const axiosConfig = {
        header: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const response = await axios.get("/api/v1/private", axiosConfig);
        setPrivateData(response.data);
        console.log("response is: ", response);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("Not authorized. Please login");
        console.log("error is: ", error);
      }
    };

    fetchPrivateData();
  }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <div style={{ background: "green", color: "white" }}>{privateData}</div>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};

export default Private;

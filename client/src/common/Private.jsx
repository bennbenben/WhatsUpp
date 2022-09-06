// Import libraries
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import internal components
import { Store } from "../../data/Store";
import { setLoadingFalse, setLoadingTrue, userLogout } from "../../data/Actions";

const Private = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [globalState, dispatch] = useContext(Store);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoadingTrue());

    if (!localStorage.getItem("authToken")) {
      dispatch(setLoadingFalse());
      navigate("/login");
    } else {
      console.log("authToken is: ", localStorage.getItem("authToken"));
    }

    const fetchPrivateData = async () => {
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const response = await axios.get("/api/v1/private", axiosConfig);
        setPrivateData(response.data.data);
        dispatch(setLoadingFalse());
        console.log("response is: ", response);
      } catch (error) {
        localStorage.removeItem("authToken");
        dispatch(userLogout());
        setError("Not authorized. Please login");
        console.log("error is: ", error);
      }
    };

    fetchPrivateData();
  }, []);

  const logoutHandler = () => {
    dispatch(setLoadingTrue());
    localStorage.removeItem("authToken");
    dispatch(userLogout());
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

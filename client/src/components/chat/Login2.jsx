import React from "react";
import "./Login2.css";
import { Button } from "@mui/material";
import { actionTypes } from "../../Reducer";
import { useStateValue } from "../../StateProvider"

function Login2() {
  // {} is the state, dispatch for your payload data here
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    // sign in code here...
    // your authentication (result)
    let result = {
      key1: "blabla",
      key2: "blabla2",
      user: {
        name: "Bobo Tangina",
        // this key need to change to render user display name
        displayName: "BoboTan",
        email: "bobotan@gmail.com",
        // this key need to change in Sidebar.jsx to render user profile
        photoURL: "myphotourl.com"
      }
    }
    dispatch({
      type: actionTypes.SET_USER,
      user: result.user
    })
    
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt=""
        />
        <div className="login__text">
          <h1>Sign in to Whatsupp</h1>
        </div>
        <Button onClick={signIn}>Sign in here!</Button>
      </div>
    </div>
  );
}

export default Login2;

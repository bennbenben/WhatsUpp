// React methods
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Components
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Chat from "./components/chat/Chat";
import Sidebar from "./components/chat/Sidebar";
import HelloWorld from "./components/users/HelloWorld";
import Hello from "./components/users/Hello";
import Login2 from "./components/chat/Login2";
import { useStateValue } from "./StateProvider";

// Styles
import "./App.css";
import Private from "./components/users/Private";

const App = () => {
  console.log("APP.JS RENDER");
  const [{ user }, dispatch] = useStateValue();

  return (
    <div>
      <div className="app">
        {!user ? ( 
        console.log("this happened") && 
        <Login />
        ) : (
          <div className="app__body">
            <BrowserRouter>
              <Sidebar />
              <Routes>
                <Route path="/rooms/:roomId" element={<Chat />}/>
              </Routes>
            </BrowserRouter>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

{
  /* <BrowserRouter>
            <Routes>
            <Route element={<PrivateRoute />} >
              <Route index element={<Hello />} />
                <Route path="/helloworld" element={<HelloWorld />} />
              <Route path="/private" element={<Private />} />
              </Route>

            <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            <Route exact path="/forgotpassword" element={<ForgotPassword />} />
            <Route exact path="/passwordreset/:resetToken" element={<ResetPassword />} />
            </Routes>
          </BrowserRouter> */
}

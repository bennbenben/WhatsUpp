// React methods
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

// Styles
import "./App.css";
import Private from "./components/users/Private";

const App = () => {
  console.log("APP.JS RENDER")
  return (
    <div>
      <div className="app">
        {/* <h1>Lets build a whatsapp chat</h1>
        <div className="app__body">
          <Sidebar />
          <Chat />
        </div> */}

        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoute />} >
              <Route index element={<Hello />} />
              <Route path="/hello" element={<HelloWorld />} />
              <Route path="/private" element={<Private />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route exact path="/forgotpassword" element={<ForgotPassword />} /> */}
            {/* <Route exact path="/passwordreset/:resetToken" element={<ResetPassword />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;

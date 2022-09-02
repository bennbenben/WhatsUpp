import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Chat from "./components/chat/Chat";
import Sidebar from "./components/chat/Sidebar";
import Login2 from "./components/chat/Login2";
import { useStateValue } from "./StateProvider";

// const fetchHelloWorld = () => {
//   fetch("/hello-world/test-api").then((resp) => {
//     console.log(resp);
//   });
// };

const App = () => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div>
      <div className="app">
        {!user ? (
          <Login2 />
        ) : (
          <div className="app__body">
            <BrowserRouter>
              <Sidebar />
              <Routes>
                <Route
                  path="/rooms/:roomId"
                  element={
                    <>
                      <Chat />
                    </>
                  }
                />
              </Routes>
            </BrowserRouter>
          </div>
        )}
      </div>
      {/* <BrowserRouter>
            <Routes>
              <Route path="/register" exact element={<Register />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/testing" exact element={<Chat />} />
            </Routes>
          </BrowserRouter> */}
    </div>
  );
};

export default App;

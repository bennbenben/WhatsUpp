import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Chat from "./components/chat/Chat";
import Sidebar from "./components/chat/Sidebar";

// const fetchHelloWorld = () => {
//   fetch("/hello-world/test-api").then((resp) => {
//     console.log(resp);
//   });
// };

const App = () => {
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
            <Route path="/register" exact element={<Register />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/testing" exact element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;

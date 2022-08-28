import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Chat from "./components/chat/Chat";

const fetchHelloWorld = () => {
  fetch("/hello-world/test-api")
  .then(resp => {
    console.log(resp);
  })
}


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" exact element={<Chat/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/users/Login";
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
        <Route path="/login" element={<Login />} />
        <Route path="/" exact element={<Chat/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

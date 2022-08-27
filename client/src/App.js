import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Chat from "./components/Chat";

const fetchHelloWorld = () => {
  fetch("/hello-world/test-api")
  .then(resp => {
    console.log(resp);
  })
}


const App = () => {
  return (
    // <>
    // <button onClick={fetchHelloWorld}>hello world</button>
    //   <div className="App">
    //     <header className="App-header">
    //       <p>Hello World!</p>
    //     </header>
    //   </div>
    // </>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" exact element={<Chat/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

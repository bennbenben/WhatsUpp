import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from 'react'

function App() {
  useEffect(() => {
    fetch("https://whats-upp-server.herokuapp.com/").then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>return indicator</p>
      </header>
    </div>
  );
}

export default App;

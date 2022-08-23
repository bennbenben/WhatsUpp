import "./App.css";

const fetchHelloWorld = () => {
  fetch("/hello-world/test-api")
  .then(resp => {
    console.log(resp);
  })
}


function App() {
  return (
    <>
    <button onClick={fetchHelloWorld}>hello world</button>
      <div className="App">
        <header className="App-header">
          <p>Hello World!</p>
        </header>
      </div>
    </>
  );
}

export default App;

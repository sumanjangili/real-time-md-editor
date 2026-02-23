// src/App.tsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Editor from "./components/Editor";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* Existing Vite + React demo */}
      <h1>Real‑Time Collaborative Markdown Editor</h1>

      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>
          count is {count}
        </button>
        <p>A lightweight way to co‑author documents without the overhead of heavyweight office suites.</p>
        <p>
          <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </p>
      </div>

      {/* custom editor component */}
      <Editor />
    </div>
  );
}

export default App;

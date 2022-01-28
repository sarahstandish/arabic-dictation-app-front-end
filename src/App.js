import "./App.css";
import React, { useState } from "react";
import DictationForm from "./components/DictationForm";
import Start from "./components/Start";
import MenuForm from "./components/MenuForm";

function App() {
  const [words, setWords] = useState([]);

  return (
    <div className="App">
      <p>This is the App component</p>
      <h1 id="app-title">Arabic Dictation App</h1>
      <Start className="Start" />
      <MenuForm className="MenuForm" />
      <DictationForm className="DictationForm" />
    </div>
  );
}

export default App;

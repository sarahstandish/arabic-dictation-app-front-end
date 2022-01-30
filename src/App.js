import "./App.css";
import React, { useState } from "react";
import DictationForm from "./components/DictationForm";
import Start from "./components/Start";
import MenuForm from "./components/MenuForm";

function App() {
  // const [words, setWords] = useState([]);

  // visibility of each component
  const [visibility, setVisibility] = useState({
    start: true,
    menuForm: false,
    dictationForm: true,
  });

  const changeVisibility = (component1, component2 = null) => {
    // change visibility of one or two components
    const visibilityCopy = { ...visibility };
    visibilityCopy[component1] = !visibilityCopy[component1];
    if (component2) {
      visibilityCopy[component2] = !visibilityCopy[component2];
    }
    setVisibility(visibilityCopy);
    console.log("Change visibility clicked");
  };

  return (
    <div className="App">
      <h1 id="app-title">Arabic Dictation App</h1>
      <Start
        visibility={visibility["start"]}
        changeVisibility={changeVisibility}
      />
      <MenuForm visibility={visibility["menuForm"]} />
      <DictationForm visibility={visibility["dictationForm"]} />
    </div>
  );
}

export default App;

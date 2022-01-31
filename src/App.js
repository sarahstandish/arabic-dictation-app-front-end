import "./App.css";
import React, { useState } from "react";
import DictationForm from "./components/DictationForm";
import Start from "./components/Start";
import MenuForm from "./components/MenuForm";
import axios from "axios";

function App() {
  // the words to present to the user
  const [words, setWords] = useState([]);

  const [currWord, setCurrWord] = useState({});

  const [nextWord, setNextWord] = useState({});

  const [moreWordsAvailable, setMoreWordsAvailable] = useState(false);

  const [error, setError] = useState("");

  // get words from api
  const getWords = (letters) => {
    let url = "https://arabic-dictation-api.herokuapp.com/words";
    // letters passed as null if only base url should be used
    if (letters) {
      url += `?letters=${letters}`;
    }
    axios
      .get(url)
      .then((response) => {
        setWords(response.data["words"]);
        setMoreWordsAvailable(response.data["more_words_available"]);
      })
      .catch((error) => setError(error.response.data["message"]));
  };

  // visibility of each component
  const [visibility, setVisibility] = useState({
    start: true,
    menuForm: false,
    dictationForm: true,
  });

  // change visibility of one or two components
  const changeVisibility = (component1, component2 = null) => {
    const visibilityCopy = { ...visibility };
    visibilityCopy[component1] = !visibilityCopy[component1];
    if (component2) {
      visibilityCopy[component2] = !visibilityCopy[component2];
    }
    setVisibility(visibilityCopy);
  };

  return (
    <div className="App">
      <h1 id="app-title">Arabic Dictation App</h1>
      <Start
        visibility={visibility["start"]}
        changeVisibility={changeVisibility}
      />
      <MenuForm
        visibility={visibility["menuForm"]}
        changeVisibility={changeVisibility}
        getWords={getWords}
      />
      <DictationForm visibility={visibility["dictationForm"]} />
    </div>
  );
}

export default App;

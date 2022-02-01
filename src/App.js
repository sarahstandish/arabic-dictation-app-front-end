import "./App.css";
import React, { useEffect, useState } from "react";
import DictationForm from "./components/DictationForm";
import Start from "./components/Start";
import MenuForm from "./components/MenuForm";
import axios from "axios";

function App() {
  // the words to present to the user
  const [words, setWords] = useState([]);

  const [currWord, setCurrWord] = useState({});

  // const [nextWord, setNextWord] = useState({});

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
        setCurrWord(response.data["words"].shift());
        setWords(response.data["words"]);
        setMoreWordsAvailable(response.data["more_words_available"]);
        setError("");
      })
      .catch((error) => {
        setError(error.response.data["message"]);
        setWords([]);
      });
  };

  // const updateCurrWord = () => {
  //   let wordsCopy = words;
  //   let firstWord = wordsCopy.shift();
  //   setCurrWord(firstWord);
  //   setWords(wordsCopy);
  // };

  // const updateNextWord = () => {
  //   let wordsCopy = words;
  //   let firstWord = wordsCopy.shift();
  //   setNextWord(firstWord);
  //   setWords(wordsCopy);
  // };

  // visibility of each component
  const [visibility, setVisibility] = useState({
    start: true,
    menuForm: false,
    dictationForm: false,
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
      <DictationForm
        visibility={visibility["dictationForm"]}
        changeVisibility={changeVisibility}
        error={error}
        currWord={currWord}
      />
    </div>
  );
}

export default App;

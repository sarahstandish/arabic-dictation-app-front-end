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

  // visibility of each component
  const [visibility, setVisibility] = useState({
    start: true,
    menuForm: false,
    dictationForm: false,
    feedback: false,
  });

  // change visibility of components
  const changeVisibility = (components) => {
    console.log("change visibility clicked");
    const visibilityCopy = { ...visibility };
    for (let component of components) {
      console.log("Component is", component);
      visibilityCopy[component] = !visibilityCopy[component];
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

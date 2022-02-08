import "./App.css";
import React, { useState, useCallback } from "react";
import DictationForm from "./components/DictationForm";
import Start from "./components/Start";
import MenuForm from "./components/MenuForm";
import axios from "axios";
import ErrorScreen from "./components/ErrorScreen";

function App() {
  // the words to present to the user
  const [words, setWords] = useState([]);

  const [currWord, setCurrWord] = useState({});

  const [moreWordsAvailable, setMoreWordsAvailable] = useState(false);

  const [error, setError] = useState("");

  const [searchLetters, setSearchLetters] = useState("");

  const [loading, setLoading] = useState(false);

  // visibility of each component
  const [visibility, setVisibility] = useState({
    start: true,
    menuForm: false,
    dictationForm: false,
    pronounceWord: true,
    inputForm: true,
    feedback: false,
    errorScreen: false,
    getClass: function (component) {
      if (!this[component]) {
        return "invisible";
      } else {
        return "visible";
      }
    },
  });

  const loadingOn = () => {
    setLoading(true);
  };

  // get words from api
  const getWords = (letters) => {
    setSearchLetters(letters);
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
        // show dictation form if currently invisible
        if (visibility["menuForm"]) {
          changeVisibility(["menuForm", "dictationForm"]);
        }
      })
      .catch((error) => {
        setError(error.response.data["message"]);
        setWords([]);
        changeVisibility(["menuForm", "errorScreen"]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getNextWord = (currWordCorrect) => {
    let wordsCopy = words;

    // push the current word back on to the end of the words array if the user got it wrong
    if (!currWordCorrect) {
      wordsCopy.push(currWord);
    }
    if (words.length > 0) {
      // get a new current word, if there are words left
      let firstWord = wordsCopy.shift();
      setCurrWord(firstWord);
      setWords(wordsCopy);
      setError("");
      changeVisibility(["inputForm", "feedback"]);
    } else if (words.length === 0 && moreWordsAvailable) {
      // search again
      getWords(searchLetters);
      setError("");
      changeVisibility(["inputForm", "feedback"]);
    } else if (words.length === 0 && !moreWordsAvailable) {
      // set an error message
      setCurrWord({});
      setError(
        "There are no more words available with the selected letter combination."
      );
      changeVisibility(["dictationForm", "errorScreen"]);
    }
  };

  // change visibility of components
  const changeVisibility = (components) => {
    const visibilityCopy = { ...visibility };
    for (let component of components) {
      visibilityCopy[component] = !visibilityCopy[component];
    }
    setVisibility(visibilityCopy);
  };

  const focusHere = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus();
      console.log("Focus is now on ", inputElement);
    }
  }, []);

  const onEnter = (event) => {
    console.log("Inside on enter");
    console.log(event.key);
  };

  return (
    <div className="App">
      <h1 id="app-title">Arabic Dictation App</h1>
      <Start
        visibility={visibility}
        changeVisibility={changeVisibility}
        loading={loading}
        focusHere={focusHere}
      />
      <MenuForm
        visibility={visibility}
        getWords={getWords}
        loading={loading}
        loadingOn={loadingOn}
        focusHere={focusHere}
      />
      <DictationForm
        visibility={visibility}
        changeVisibility={changeVisibility}
        currWord={currWord}
        getNextWord={getNextWord}
        focusHere={focusHere}
      />
      <ErrorScreen
        visibility={visibility}
        error={error}
        changeVisibility={changeVisibility}
        focusHere={focusHere}
      />
    </div>
  );
}

export default App;

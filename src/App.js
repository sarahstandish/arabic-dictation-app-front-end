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

  const [searchLetters, setSearchLetters] = useState("");

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
      })
      .catch((error) => {
        setError(error.response.data["message"]);
        setWords([]);
      });
  };

  const updateCurrWord = (currWordCorrect) => {
    console.log("Updating current word");
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
    } else if (words.length === 0 && moreWordsAvailable) {
      // search again
      getWords(searchLetters);
      setError("");
    } else if (words.length === 0 && !moreWordsAvailable) {
      // set an error message
      setCurrWord({});
      setError(
        "There are no more words available with the selected letter combination."
      );
    }
  };

  // input and pronounceWord should be invisible if there is an error, visible if not
  useEffect(() => {
    const visibilityCopy = { ...visibility };

    if (error) {
      visibilityCopy["pronounceWord"] = false;
      visibilityCopy["inputForm"] = false;
      setVisibility(visibilityCopy);
    } else {
      visibilityCopy["pronounceWord"] = true;
      visibilityCopy["inputForm"] = true;
      setVisibility(visibilityCopy);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  // visibility of each component
  const [visibility, setVisibility] = useState({
    start: true,
    menuForm: false,
    dictationForm: false,
    pronounceWord: true,
    inputForm: true,
    feedback: false,
    getClass: function (component) {
      if (!this[component]) {
        return "invisible";
      }
    },
  });

  // change visibility of components
  const changeVisibility = (components) => {
    const visibilityCopy = { ...visibility };
    for (let component of components) {
      visibilityCopy[component] = !visibilityCopy[component];
    }
    setVisibility(visibilityCopy);
  };

  return (
    <div className="App">
      <h1 id="app-title">Arabic Dictation App</h1>
      <Start visibility={visibility} changeVisibility={changeVisibility} />
      <MenuForm
        visibility={visibility}
        changeVisibility={changeVisibility}
        getWords={getWords}
      />
      <DictationForm
        visibility={visibility}
        changeVisibility={changeVisibility}
        error={error}
        currWord={currWord}
        updateCurrWord={updateCurrWord}
      />
    </div>
  );
}

export default App;

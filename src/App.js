import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import DictationForm from "./components/DictationForm";
import Start from "./components/Start";
import MenuForm from "./components/MenuForm";
import axios from "axios";
import ErrorScreen from "./components/ErrorScreen";
import ReactGA from "react-ga";

function App() {
  // the array words of words that will be given to the user
  const [words, setWords] = useState([]);

  // the current word presented to the user
  const [currWord, setCurrWord] = useState({});

  // whether there are more words available
  const [moreWordsAvailable, setMoreWordsAvailable] = useState(false);

  // any error messages
  const [error, setError] = useState("");

  // the letters the user searched for
  const [searchLetters, setSearchLetters] = useState("");

  // whether or not the user searched for all letters on their last search
  const [searchedForAllLetters, setSearchedForAllLetters] = useState(false);

  // whether or not the words are being loaded from the api
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
    keyboard: false,
  });

  const loadingOn = () => {
    setLoading(true);
  };

  // get words from api
  const getWords = (letters, retryLastWord = false) => {
    setSearchLetters(letters);
    let url = "https://arabic-dictation-api.herokuapp.com/words";
    // letters passed as null if only base url should be used
    if (letters) {
      url += `?letters=${letters}`;
      setSearchedForAllLetters(false);
    } else {
      setSearchedForAllLetters(true);
    }
    const currWordCopy = currWord;
    axios
      .get(url)
      .then((response) => {
        const responseWordsArr = [...response.data.words];
        // add the last word to the word array if the user got it wrong
        if (retryLastWord) {
          responseWordsArr.push(currWordCopy);
        }
        setCurrWord(responseWordsArr.shift());
        setWords(responseWordsArr);
        setMoreWordsAvailable(response.data.more_words_available);
        setError("");
        // show dictation form if currently invisible
        changeVisibility({
          menuForm: false,
          dictationForm: true,
          inputForm: true,
          feedback: false,
        });
      })
      .catch((error) => {
        setError(error.response.data["message"]);
        setWords([]);
        changeVisibility({
          menuForm: false,
          errorScreen: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // get the next word after the user has reviewed the feedback and pressed 'next'
  const getNextWord = (currWordCorrect) => {
    let wordsCopy = [...words];

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
      changeVisibility({ inputForm: true, feedback: false });
    } else if (words.length === 0 && moreWordsAvailable) {
      // search again
      getWords(searchLetters, !currWordCorrect);
      setError("");
      changeVisibility({ inputForm: true, feedback: false });
    } else if (words.length === 0 && !moreWordsAvailable) {
      // set an error message
      setCurrWord({});
      setError(
        "There are no more words available with the selected letter combination."
      );
      changeVisibility({ dictationForm: false, errorScreen: true });
    }
  };

  // toggle visibility of components
  const changeVisibility = (componentsObj) => {
    const visibilityCopy = { ...visibility };
    for (let component of Object.keys(componentsObj)) {
      visibilityCopy[component] = componentsObj[component];
    }
    setVisibility(visibilityCopy);
  };

  // put the focus on a button or element so the user can navigate via the keyboard
  const focusHere = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  // google analytics
  ReactGA.initialize("UA-220361189-1");
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <div className="App">
      <header>
        <h1 id="app-title">Arabic Dictation App</h1>
      </header>
      {visibility.start && (
        <Start
          changeVisibility={changeVisibility}
          loading={loading}
          focusHere={focusHere}
        />
      )}
      {visibility.menuForm && (
        <MenuForm
          getWords={getWords}
          loading={loading}
          loadingOn={loadingOn}
          focusHere={focusHere}
          searchLetters={searchLetters}
          searchedForAllLetters={searchedForAllLetters}
        />
      )}
      {visibility.dictationForm && (
        <DictationForm
          visibility={visibility}
          changeVisibility={changeVisibility}
          currWord={currWord}
          getNextWord={getNextWord}
          focusHere={focusHere}
          searchLetters={searchLetters}
          searchedForAllLetters={searchedForAllLetters}
        />
      )}
      {visibility.errorScreen && (
        <ErrorScreen
          error={error}
          changeVisibility={changeVisibility}
          focusHere={focusHere}
        />
      )}
    </div>
  );
}

export default App;

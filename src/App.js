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

  const [loading, setLoading] = useState(false);

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
    console.log("I'm inside getWords, outside of the API call");
    axios
      .get(url)
      .then((response) => {
        setCurrWord(response.data["words"].shift());
        setWords(response.data["words"]);
        setMoreWordsAvailable(response.data["more_words_available"]);
        setError("");
        // show dictation form if currently invisible
        console.log("I'm inside getWords and the API call just happened.");
        changeVisibility(["menuForm", "dictationForm"]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data["message"]);
        setWords([]);
        setLoading(false);
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

  // change visibility of components
  const changeVisibility = (components) => {
    const visibilityCopy = { ...visibility };
    for (let component of components) {
      console.log(
        `Changing the visibility of ${component} from ${
          visibilityCopy[component]
        } to ${!visibilityCopy[component]}`
      );
      visibilityCopy[component] = !visibilityCopy[component];
    }
    setVisibility(visibilityCopy);
  };

  return (
    <div className="App">
      <h1 id="app-title">Arabic Dictation App</h1>
      <Start
        visibility={visibility}
        changeVisibility={changeVisibility}
        loading={loading}
      />
      <MenuForm
        visibility={visibility}
        getWords={getWords}
        loading={loading}
        loadingOn={loadingOn}
      />
      {/* {loading && <Spinner />} */}
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

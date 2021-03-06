import "./DictationForm.css";
import React, { useState } from "react";
import PronounceWord from "./ProunounceWord.js";
import InputForm from "./InputForm";
import Feedback from "./Feedback";
import PropTypes from "prop-types";

// a component to contain everything that's involved in the dictation
// from playing the audio file
// to getting user input
const DictationForm = ({
  visibility,
  changeVisibility,
  currWord,
  getNextWord,
  focusHere,
  searchLetters,
  searchedForAllLetters,
}) => {
  const [submittedWord, setSubmittedWord] = useState("");

  const updateSubmittedWord = (word) => {
    setSubmittedWord(word);
  };

  return (
    <div className="dictation-form">
      <div id="change-letters-pronounce-word-container">
        <button
          className="button"
          id="change-letters-button"
          onClick={() =>
            changeVisibility({ dictationForm: false, menuForm: true })
          }
        >
          Change letters
        </button>
        {visibility.pronounceWord && <PronounceWord currWord={currWord} />}
      </div>
      {visibility.inputForm && (
        <InputForm
          changeVisibility={changeVisibility}
          currWord={currWord}
          updateSubmittedWord={updateSubmittedWord}
          focusHere={focusHere}
          visibility={visibility}
          searchLetters={searchLetters}
          searchedForAllLetters={searchedForAllLetters}
        />
      )}
      {visibility.feedback && (
        <Feedback
          currWord={currWord}
          submittedWord={submittedWord}
          getNextWord={getNextWord}
          focusHere={focusHere}
        />
      )}
    </div>
  );
};

DictationForm.propTypes = {
  visibility: PropTypes.object.isRequired,
  changeVisibility: PropTypes.func.isRequired,
  currWord: PropTypes.object,
  getNextWord: PropTypes.func.isRequired,
  focusHere: PropTypes.func.isRequired,
  searchLetters: PropTypes.string.isRequired,
  searchedForAllLetters: PropTypes.bool.isRequired,
};

export default DictationForm;

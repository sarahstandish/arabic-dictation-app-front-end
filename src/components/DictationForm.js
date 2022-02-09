import "./DictationForm.css";
import React, { useState } from "react";
import PronounceWord from "./ProunounceWord.js";
import InputForm from "./InputForm";
import Feedback from "./Feedback";
import PropTypes from "prop-types";

const DictationForm = ({
  visibility,
  toggleVisibility,
  currWord,
  getNextWord,
  focusHere,
}) => {
  const [submittedWord, setSubmittedWord] = useState("");

  const updateSubmittedWord = (word) => {
    setSubmittedWord(word);
  };

  return (
    <div className="dictation-form">
      <button
        className="button"
        id="change-letters-button"
        onClick={() => toggleVisibility(["dictationForm", "menuForm"])}
      >
        Change letters
      </button>
      {visibility.pronounceWord && <PronounceWord currWord={currWord} />}
      {visibility.inputForm && (
        <InputForm
          toggleVisibility={toggleVisibility}
          currWord={currWord}
          updateSubmittedWord={updateSubmittedWord}
          focusHere={focusHere}
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
  toggleVisibility: PropTypes.func.isRequired,
  currWord: PropTypes.object,
  getNextWord: PropTypes.func.isRequired,
  focusHere: PropTypes.func.isRequired,
};

export default DictationForm;

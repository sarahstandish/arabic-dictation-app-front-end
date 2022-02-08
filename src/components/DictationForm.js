import "./DictationForm.css";
import React, { useState } from "react";
import PronounceWord from "./ProunounceWord.js";
import InputForm from "./InputForm";
import Feedback from "./Feedback";
import PropTypes from "prop-types";

const DictationForm = ({
  visibility,
  changeVisibility,
  currWord,
  getNextWord,
  focusHere,
}) => {
  const [submittedWord, setSubmittedWord] = useState("");

  const updateSubmittedWord = (word) => {
    setSubmittedWord(word);
  };

  return (
    <div className="dictation=form">
      <button
        className="button"
        id="change-letters-button"
        onClick={() => changeVisibility(["dictationForm", "menuForm"])}
      >
        Change letters
      </button>
      {visibility.pronounceWord && <PronounceWord currWord={currWord} />}
      {visibility.inputForm && (
        <InputForm
          changeVisibility={changeVisibility}
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
  changeVisibility: PropTypes.func.isRequired,
  currWord: PropTypes.object,
  getNextWord: PropTypes.func.isRequired,
  focusHere: PropTypes.func.isRequired,
};

export default DictationForm;

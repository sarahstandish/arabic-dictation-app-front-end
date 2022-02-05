import React, { useState } from "react";
import "./DictationForm.css";
import PronounceWord from "./ProunounceWord.js";
import InputForm from "./InputForm";
import Feedback from "./Feedback";
import PropTypes from "prop-types";

const DictationForm = ({
  visibility,
  changeVisibility,
  error,
  currWord,
  updateCurrWord,
}) => {
  const [submittedWord, setSubmittedWord] = useState("");

  const updateSubmittedWord = (word) => {
    setSubmittedWord(word);
  };

  return (
    <div className={`DictationForm ${visibility.getClass("dictationForm")}`}>
      <button
        className="button"
        id="change-letters-button"
        onClick={() => changeVisibility(["dictationForm", "menuForm"])}
      >
        Change letters
      </button>
      <PronounceWord currWord={currWord} visibility={visibility} />
      <InputForm
        visibility={visibility}
        changeVisibility={changeVisibility}
        currWord={currWord}
        updateSubmittedWord={updateSubmittedWord}
      />
      {currWord.hasOwnProperty("unvoweled_word") && (
        <Feedback
          visibility={visibility}
          currWord={currWord}
          submittedWord={submittedWord}
          updateCurrWord={updateCurrWord}
          changeVisibility={changeVisibility}
        />
      )}
    </div>
  );
};

DictationForm.propTypes = {
  visibility: PropTypes.object.isRequired,
  changeVisibility: PropTypes.func.isRequired,
  error: PropTypes.string,
  currWord: PropTypes.object,
  updateCurrWord: PropTypes.func.isRequired,
};

export default DictationForm;

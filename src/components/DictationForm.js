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
}) => {
  const [submittedWord, setSubmittedWord] = useState("");

  const updateSubmittedWord = (word) => {
    setSubmittedWord(word);
  };

  return (
    <div className={`dictation-form ${visibility.getClass("dictationForm")}`}>
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
          getNextWord={getNextWord}
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
};

export default DictationForm;

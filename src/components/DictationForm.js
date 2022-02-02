import React, { useState } from "react";
import "./DictationForm.css";
import PronounceWord from "./ProunounceWord.js";
import InputForm from "./InputForm";
import Feedback from "./Feedback";
import PropTypes from "prop-types";

const DictationForm = ({ visibility, changeVisibility, error, currWord }) => {
  const [submittedWord, setSubmittedWord] = useState("");

  const updateSubmittedWord = (word) => {
    setSubmittedWord(word);
    console.log("submitted word updated");
  };

  return (
    <div className={`Start ${!visibility ? "invisible" : null}`}>
      <PronounceWord currWord={currWord} />
      <InputForm
        currWord={currWord}
        updateSubmittedWord={updateSubmittedWord}
      />
      <p className="error">{error}</p>
      <button
        className="button"
        id="change-letters-button"
        onClick={() => changeVisibility(["dictationForm", "menuForm"])}
      >
        Change letters
      </button>
      <Feedback currWord={currWord} submittedWord={submittedWord} />
    </div>
  );
};

DictationForm.propTypes = {
  visibility: PropTypes.bool.isRequired,
  changeVisibility: PropTypes.func.isRequired,
  error: PropTypes.string,
  currWord: PropTypes.object,
};

export default DictationForm;

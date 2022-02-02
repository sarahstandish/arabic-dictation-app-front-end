import React from "react";
import "./DictationForm.css";
import PronounceWord from "./ProunounceWord.js";
import InputForm from "./InputForm";
import PropTypes from "prop-types";

const DictationForm = ({ visibility, changeVisibility, error, currWord }) => {
  return (
    <div className={`Start ${!visibility ? "invisible" : null}`}>
      <PronounceWord currWord={currWord} />
      <InputForm />
      <p className="error">{error}</p>
      <button
        className="button"
        id="change-letters-button"
        onClick={() => changeVisibility("dictationForm", "menuForm")}
      >
        Change letters
      </button>
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

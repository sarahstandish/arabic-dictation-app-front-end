import React from "react";
import "./DictationForm.css";
import PronounceWord from "./ProunounceWord.js";
import InputForm from "./InputForm";
import PropTypes from "prop-types";

const DictationForm = ({ visibility, changeVisibility }) => {
  return (
    <div className={`Start ${!visibility ? "invisible" : null}`}>
      This is the DictationForm
      <PronounceWord className="PronounceWord" />
      <InputForm className="InputForm" />
      <button
        clasName="button"
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
};

export default DictationForm;

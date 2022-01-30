import React from "react";
import "./DictationForm.css";
import PronounceWord from "./ProunounceWord.js";
import InputForm from "./InputForm";

const DictationForm = ({ visibility }) => {
  return (
    <div className={`Start ${!visibility ? "invisible" : null}`}>
      This is the DictationForm
      <PronounceWord className="PronounceWord" />
      <InputForm className="InputForm" />
    </div>
  );
};

export default DictationForm;

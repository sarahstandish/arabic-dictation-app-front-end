import React from "react";
import "./DictationForm.css";
import PronounceWord from "./ProunounceWord.js";
import InputForm from "./InputForm";

const DictationForm = () => {
  return (
    <div>
      This is the DictationForm
      <PronounceWord className="PronounceWord" />
      <InputForm className="InputForm" />
    </div>
  );
};

export default DictationForm;

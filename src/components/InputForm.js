import React, { useState } from "react";
import "./InputForm.css";
import PropTypes from "prop-types";

const InputForm = ({
  currWord,
  updateSubmittedWord,
  visibility,
  changeVisibility,
}) => {
  const [userInput, setUserInput] = useState("");

  const changeUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    updateSubmittedWord(userInput);
    setUserInput("");
    changeVisibility(["inputForm", "feedback"]);
    console.log("Checking your input...");
  };

  const isInvalidInput = () => {
    // cannot submit an empty field
    if (userInput.length < 1) {
      return true;
    }

    // check for non-arabic characters
    const lowestArabicCodePoint = parseInt("0600", 16);

    const highestArabicCodePoint = parseInt("06FF", 16);

    for (let char of userInput) {
      if (
        char.charCodeAt() < lowestArabicCodePoint ||
        char.charCodeAt() > highestArabicCodePoint
      ) {
        return true;
      }
    }

    return false;
  };

  const visibilityClass = visibility["inputForm"] ? "visible" : "invisible";

  return (
    <form onSubmit={onFormSubmit} className={`InputForm ${visibilityClass}`}>
      <p className="directions">Type the word you hear</p>
      <input
        className="arabic-user-input"
        type="text"
        value={userInput}
        onChange={changeUserInput}
      ></input>
      <button
        type="submit"
        className="button"
        id="submit-user-input-button"
        disabled={isInvalidInput()}
      >
        Check
      </button>
    </form>
  );
};

InputForm.propTypes = {
  currWord: PropTypes.object.isRequired,
  updateSubmittedWord: PropTypes.func.isRequired,
  visibility: PropTypes.object.isRequired,
  changeVisibility: PropTypes.func.isRequired,
};

export default InputForm;

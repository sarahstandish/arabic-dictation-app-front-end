import React, { useState } from "react";
import "./InputForm.css";
import PropTypes from "prop-types";

const InputForm = ({ currWord }) => {
  const [userInput, setUserInput] = useState("");

  const changeUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    setUserInput("");
    console.log("Checking your input...");
  };

  const isInvalidInput = () => {
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

  return (
    <form onSubmit={onFormSubmit} className="InputForm">
      <p class="directions">Type the word you hear</p>
      <input type="text" value={userInput} onChange={changeUserInput}></input>
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
};

export default InputForm;

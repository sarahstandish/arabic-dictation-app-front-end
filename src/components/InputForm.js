import "./InputForm.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Keyboard from "./Keyboard";

const InputForm = ({
  updateSubmittedWord,
  changeVisibility,
  focusHere,
  visibility,
  searchLetters,
  searchedForAllLetters,
}) => {
  const [userInput, setUserInput] = useState("");

  const changeUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    updateSubmittedWord(userInput);
    setUserInput("");
    changeVisibility({ inputForm: false, feedback: true });
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

  const onKeyboardButtonClick = (event) => {
    console.log("They keyboard button was clicked.");
    if (visibility.keyboard) {
      changeVisibility({ keyboard: false });
    } else {
      changeVisibility({ keyboard: true });
    }
  };

  const keyboardButtonClassname = visibility.keyboard
    ? "hide-keyboard"
    : "show-keyboard";

  const onLetterClick = (letter) => {
    let userInputCopy = userInput;
    userInputCopy += letter;
    setUserInput(userInputCopy);
  };

  const onDeleteClick = () => {
    let userInputCopy = userInput.slice(0, -1);
    setUserInput(userInputCopy);
  };

  return (
    <div className="input-form-container">
      <form className="input-form" onSubmit={onFormSubmit}>
        <p className="directions">
          Type the word you hear, without short vowels or <em>shadda</em>.
        </p>
        <input
          className="arabic-user-input arabic"
          type="text"
          value={userInput}
          onChange={changeUserInput}
          ref={focusHere}
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
      <button
        onClick={onKeyboardButtonClick}
        className={`button ${keyboardButtonClassname}`}
        id="keyboard-button"
      >
        <span className={`${keyboardButtonClassname}`}>&nbsp;</span>
        <i className={`far fa-keyboard ${keyboardButtonClassname}`}>&nbsp;</i>
        <span className={`${keyboardButtonClassname}`}> </span>
      </button>
      {visibility.keyboard && (
        <Keyboard
          searchLetters={searchLetters}
          searchedForAllLetters={searchedForAllLetters}
          onLetterClick={onLetterClick}
          onDeleteClick={onDeleteClick}
        />
      )}
    </div>
  );
};

InputForm.propTypes = {
  updateSubmittedWord: PropTypes.func.isRequired,
  changeVisibility: PropTypes.func.isRequired,
  focusHere: PropTypes.func.isRequired,
  visibility: PropTypes.object.isRequired,
  searchLetters: PropTypes.string.isRequired,
  searchedForAllLetters: PropTypes.bool.isRequired,
};

export default InputForm;
